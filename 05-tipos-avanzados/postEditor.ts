type Persona ={
  name:string;
  lastName: string;
  role : [number,string];
};
 
const admin : Persona =  {
  name: 'Jhon',
  lastName: 'Smith',
  role: [1, 'Admin'],
};

const developer : Persona= {
  name: 'Jose',
  lastName: 'Cabrera',
  role: [2, 'Developer'],
};

const editor : Persona = {
  name: 'Will',
  lastName: 'Doe',
  role: [3, 'Editor'],
};

type blogPost = {
  id:number;
  title: string;
  createdAt:string;
  author:Persona;
}

const POSTS : blogPost[] = [
  {
    id: 1,
    title: 'Aprender TypeScript',
    createdAt: '03/03/2020',
    author: developer,
  },
  {
    id: 2,
    title: 'Aprender JavaScript',
    createdAt: '18/03/2020',
    author: editor,
  },
  {
    id: 3,
    title: 'Es realmente TypeScript útil?',
    createdAt: '18/05/2020',
    author: admin,
  },
];

type EditedPost ={
  oldPost: blogPost;
  edittedBy: Persona;
  edittedAt: number;
  newPost: blogPost;
}
const postLog : Record<number,EditedPost> = {};

function isAdmin(person : Persona) {


  const [role, roleName] = person.role;

  return role === 1 && roleName === 'Admin';
}

function notHasPermissionLog({ name, role }, { title }) {
  console.log(`User ${name} with the role ${role[1]} has no permission to edit the post ${title}`);
}

for (let index = 0; index < POSTS.length; index++) {
  const post = POSTS[index];
  if (isAdmin(post.author)) {
    if (!(post.id in postLog)) {
      const copyPost = JSON.parse(JSON.stringify(post));
      copyPost.title = '¿Es realmente TypeScript útil?';
      copyPost.author = admin;

      const editedPost : EditedPost = {
        oldPost : post,
        edittedBy : admin,
        edittedAt : Date.now(),
        newPost : copyPost
      };
      postLog[post.id]= editedPost;
    }
  } else {
    notHasPermissionLog(post.author, post);
  }
}

console.log(postLog);
