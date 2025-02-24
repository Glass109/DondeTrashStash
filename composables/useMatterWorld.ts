import Matter from 'matter-js';
            import {onUnmounted, ref, type Ref, watch} from 'vue';

            interface MatterWorldOptions {
                canvasRef: Ref<HTMLElement | undefined>;
                staticBodies?: Matter.Body[];
                blockCount?: number;
            }
            export function useMatterWorld({canvasRef, staticBodies = [], blockCount = 10}: MatterWorldOptions) {
                const engine = Matter.Engine.create();
                const runner = Matter.Runner.create();
                let render: Matter.Render;
                const blocks = ref<Matter.Body[]>([]);

                const createBlock = () => {
                    const size = Math.random() * 40 + 40;
                    return Matter.Bodies.rectangle(
                        Math.random() * window.innerWidth,
                        -100,
                        size,
                        size,
                        {
                            restitution: .6,
                            friction: .1,
                            plugin: {
                                attractors: [
                                    (bodyA: Matter.Body, bodyB: Matter.Body) => ({
                                        x: (bodyA.position.x - bodyB.position.x) * 1e-6,
                                        y: (bodyA.position.y - bodyB.position.y) * 1e-6,
                                    }),
                                ],
                            },
                            render: {
                                fillStyle: `hsl(${Math.random() * 360}, 70%, 70%)`,
                            },
                        }
                    );
                };

                const initWorld = (canvas: HTMLElement) => {
                    if (!canvas) return;

                    render = Matter.Render.create({
                        element: canvas,
                        engine: engine,
                        options: {
                            width: window.innerWidth,
                            height: window.innerHeight,
                            wireframes: false,
                            background: 'transparent',
                            pixelRatio: window.devicePixelRatio,
                        },
                    });

                    const mouse = Matter.Mouse.create(render.canvas);
                    const mouseConstraint = Matter.MouseConstraint.create(engine, {
                        mouse: mouse,
                        constraint: {
                            stiffness: 0.2,
                            render: {visible: true, strokeStyle: '#ff9500'}
                        }
                    });
                    mouse.pixelRatio = render.options.pixelRatio || 1;

                    const boundaries = [
                        Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 30, window.innerWidth, 60, {isStatic: true}),
                        Matter.Bodies.rectangle(-30, window.innerHeight / 2, 60, window.innerHeight, {isStatic: true}),
                        Matter.Bodies.rectangle(window.innerWidth + 30, window.innerHeight / 2, 60, window.innerHeight, {isStatic: true})
                    ];

                    blocks.value = Array(blockCount).fill(null).map(createBlock);

                    Matter.Composite.add(engine.world, [
                        ...blocks.value,
                        ...boundaries,
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

                const updateStaticBody = (body: Matter.Body, x: number, y: number, width: number, height: number) => {
                    Matter.World.remove(engine.world, body);
                    Matter.Body.setPosition(body, {x: x + width / 2, y: y + height / 2});
                    const tempBody = Matter.Bodies.rectangle(x + width / 2, y + height / 2, width, height, {
                        isStatic: true,
                        ...body.render
                    });
                    Matter.Body.setVertices(body, tempBody.vertices);
                    Matter.World.add(engine.world, body);
                };

                const handleResize = () => {
                    if (render) {
                        render.canvas.width = window.innerWidth;
                        render.canvas.height = window.innerHeight;
                        render.options.width = window.innerWidth;
                        render.options.height = window.innerHeight;

                        // Update boundaries
                        const boundaries = engine.world.bodies.slice(-3);
                        Matter.Body.setPosition(boundaries[0], Matter.Vector.create(window.innerWidth / 2, window.innerHeight + 30));
                        Matter.Body.setVertices(boundaries[0], Matter.Bodies.rectangle(window.innerWidth / 2, window.innerHeight + 30, window.innerWidth, 60, { isStatic: true }).vertices);

                        Matter.Body.setPosition(boundaries[1], Matter.Vector.create(-30, window.innerHeight / 2));
                        Matter.Body.setVertices(boundaries[1], Matter.Bodies.rectangle(-30, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true }).vertices);

                        Matter.Body.setPosition(boundaries[2], Matter.Vector.create(window.innerWidth + 30, window.innerHeight / 2));
                        Matter.Body.setVertices(boundaries[2], Matter.Bodies.rectangle(window.innerWidth + 30, window.innerHeight / 2, 60, window.innerHeight, { isStatic: true }).vertices);

                        Matter.Render.lookAt(render, {
                            min: { x: 0, y: 0 },
                            max: { x: window.innerWidth, y: window.innerHeight }
                        });
                    }
                };

                watch(canvasRef, (newCanvas) => {
                    if (newCanvas && !render) {
                        initWorld(newCanvas);
                        window.addEventListener('resize', handleResize);
                    }
                }, {immediate: true});

                onUnmounted(() => {
                    if (render) {
                        Matter.Render.stop(render);
                        Matter.Runner.stop(runner);
                        Matter.Engine.clear(engine);
                        window.removeEventListener('resize', handleResize);
                    }
                });

                return {addBlock, blocks, engine, updateStaticBody};
            }