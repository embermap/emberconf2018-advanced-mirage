export default function({ schema }) {
  let alice = schema.users.create({ name: 'Alice' });

  let rails = schema.posts.create({ title: 'Rails is omakase'});
  let ember = schema.posts.create({ title: 'Ember is sushi' });

  let mirage = schema.videos.create({ name: 'Mirage training' });

  alice.update({
    posts: [rails, ember],
    videos: [mirage]
  });

  schema.comments.create({
    commentable: ember,
    text: 'Ember is great!'
  });

  schema.comments.create({
    commentable: mirage,
    text: 'Mirage is awesome!'
  });
}
