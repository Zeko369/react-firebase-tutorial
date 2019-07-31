class Posts {
  posts = () => ({
    ['1']: { title: 'foobar' },
    ['2']: { title: 'asdasda' },
    ['3']: { title: 'wa a as dkjasdas' }
  });

  constructor() {}

  static getById(id) {
    // console.log(posts);
    console.log(this.posts);

    // return this.posts[id] || {};
  }
}

console.log(Posts.getById(1));
