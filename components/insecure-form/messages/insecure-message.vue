<script setup lang="ts">
type Post = {
  Id: number;
  Title: string;
  Content: string;
  User: {
    Username: string;
    Email: string
  }
};
const props = defineProps<{ post : Post }>();

</script>

<template>
<Card>
  <CardHeader>
    <h1 class="text-2xl">{{post.Title}}</h1>
  </CardHeader>
  <CardContent>
    <p v-html="post.Content"></p>
  </CardContent>
  <CardFooter class="flex gap-2">
    <small class="text-muted-foreground text-sm">🕴️: {{post.User.Username}}</small>
    <small class="text-muted-foreground text-sm">📧: {{post.User.Email}}</small>
  </CardFooter>
</Card>
</template>

<style scoped>

</style>