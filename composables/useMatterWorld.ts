// useMatterWorld.ts
import Matter from 'matter-js';
import {onUnmounted, ref, type Ref, type UnwrapRef, watch} from 'vue';

// Define the types for our world options to ensure type safety
interface MatterWorldOptions {
    canvasRef: Ref<HTMLElement | undefined>;  // Referencia al elemento canvas
    staticBodies?: Matter.Body[];             // Los cuerpos ESTÁTICOS que no se moverán
    blockCount?: number;                      // Con cuantos bloques iniciamos
}

// Esto es lo que devolveremos a nuestro componente por parte del composible
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface MatterWorldReturn {
    addBlock: () => void;           // Función para añadir un nuevo bloque
    blocks: Ref<Matter.Body[]>;     // Referencia reactiva a los bloques en el mundo
    engine: Matter.Engine;          // La instancia del motor de físicas
    onFormResize?: (body: Matter.Body) => void;
    updateStaticBody: (body: Matter.Body, x: number, y: number, width: number, height: number) => void;
}

/**b
 * Hook para crear un mundo Matter.js con bloques que caen
 * @param canvasRef Referencia al elemento canvas
 * @param staticBodies Cuerpos estáticos que no se moverán
 * @param blockCount Número de bloques con los que iniciamos
 */
export function useMatterWorld({
                                   canvasRef,
                                   staticBodies = [],
                                   blockCount = 10
                               }: MatterWorldOptions): {
    addBlock: () => void;
    blocks: Ref<UnwrapRef<Matter.Body[]>, UnwrapRef<Matter.Body[]> | Matter.Body[]>;
    engine: Matter.Engine;
    updateStaticBody: (body: Matter.Body, x: number, y: number, width: number, height: number) => void
} {
    // Create our Matter.js instances
    const engine = Matter.Engine.create();
    const runner = Matter.Runner.create();
    let render: Matter.Render | undefined;

    const blocks = ref<Matter.Body[]>([]);
    const createBlock = () => {
        const size = Math.random() * 40 + 40;

        return Matter.Bodies.rectangle(
            Math.random() * window.innerWidth,
            -100,  // Se inicia arriba del viewport pqra que no se vea que spawnean
            size,
            size,
            {
                restitution: .6,  // ¿Quién verga le dice "restitución" a la elasticidad o rebote?
                friction: .1,     // Fricción con otros cuerpos
                plugin: {
                    // Atracción sutil entre bloques
                    attractors: [
                        (bodyA: Matter.Body, bodyB: Matter.Body) => {
                            return {
                                x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                                y: (bodyA.position.y - bodyB.position.y) * 1e-6,
                            };
                        },
                    ],
                },
                render: {
                    fillStyle: `hsl(${Math.random() * 360}, 70%, 70%)`, // Random pastel color
                },
            }
        );
    };

    // Initialize the physics world with all its components
    const initWorld = (canvas: HTMLElement) => {
        if (!canvas) return;

        // Create the renderer that will draw our physics world
        render = Matter.Render.create({
            element: canvas,
            engine: engine,
            options: {
                width: window.innerWidth,
                height: window.innerHeight,
                wireframes: false,        // Show solid colors instead of wireframes
                background: 'transparent', // Allow the page background to show through
                pixelRatio: window.devicePixelRatio, // Handle high-DPI displays
            },
        });

        // Create and add mouse control
        const mouse = Matter.Mouse.create(render.canvas);
        const mouseConstraint = Matter.MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: true,
                    strokeStyle: '#ff9500',
                }
            }
        });
        // Match mouse and render pixel ratios
        mouse.pixelRatio = render.options.pixelRatio || 1;
        // Add to world only once
        Matter.Composite.add(engine.world, mouseConstraint);



        // Create the ground and walls to contain our physics objects
        const ground = Matter.Bodies.rectangle(
            window.innerWidth / 2,        // Center horizontally
            window.innerHeight + 30,      // Just below viewport
            window.innerWidth,            // Full width
            60,                          // Thickness
            {isStatic: true}           // Make it immovable
        );

        const leftWall = Matter.Bodies.rectangle(
            -30,                         // Just outside viewport
            window.innerHeight / 2,      // Center vertically
            60,                         // Thickness
            window.innerHeight,          // Full height
            {isStatic: true}
        );

        const rightWall = Matter.Bodies.rectangle(
            window.innerWidth + 30,      // Just outside viewport
            window.innerHeight / 2,
            60,
            window.innerHeight,
            {isStatic: true}
        );

        const initialBlocks = Array(blockCount)
            .fill(null)
            .map(() => createBlock());
        blocks.value = initialBlocks;

        Matter.Composite.add(engine.world, [
            ...initialBlocks,
            ground,
            leftWall,
            rightWall,
            mouseConstraint,
            ...staticBodies,
        ]);

        Matter.Runner.run(runner, engine);
        Matter.Render.run(render);
    };

    const addBlock = () => {
        const block = createBlock();
        blocks.value.push(block);
        Matter.Composite.add(engine.world, block);
    };
    // Para cuando se redimensiona el formulario
    const updateStaticBody = (body: Matter.Body, x: number, y: number, width: number, height: number) => {
        // Remueve el cuerpo del mundo
        Matter.World.remove(engine.world, body);

        // Update the body's position
        Matter.Body.setPosition(body, {
            x: x + width / 2,
            y: y + height / 2
        });

        // Create a temporary body to get the correct vertices
        const updatedBody = Matter.Bodies.rectangle(x + width / 2, y + height / 2, width, height, {
            isStatic: true,
            ...body.render
        });

        // Update the body's vertices
        Matter.Body.setVertices(body, updatedBody.vertices);

        // Add the updated body back to the world
        Matter.World.add(engine.world, body);
    };

    const handleResize = () => {
        if (render) {
            render.canvas.width = window.innerWidth;
            render.canvas.height = window.innerHeight;
            Matter.Body.setPosition(
                engine.world.bodies[engine.world.bodies.length - 3], // ground
                Matter.Vector.create(window.innerWidth / 2, window.innerHeight + 30)
            );
            Matter.Body.setPosition(
                engine.world.bodies[engine.world.bodies.length - 2], // right wall
                Matter.Vector.create(window.innerWidth + 30, window.innerHeight / 2)
            );
        }
    };

    // Un Watch para iniciar el mundo cuando el canvas esté listo
    watch(canvasRef, (newCanvas) => {
        if (newCanvas && !render) {
            initWorld(newCanvas);
            window.addEventListener('resize', handleResize);
        }
    }, {immediate: true});

    // Limpiar el mundo cuando el componente se desmonte
    onUnmounted(() => {
        if (render) {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
            Matter.Engine.clear(engine);
            window.removeEventListener('resize', handleResize);
        }
    });

    // Retorna las referencias y funciones que necesitamos en nuestro componente
    return {
        addBlock,
        blocks,
        engine,
        updateStaticBody
    }
}