// @Injectable()
// export class UserService {
//   constructor(private readonly db: MemoryDb) {}

//   getAll() {
//     return this.db.findAll('users').map((u) => this.stripPassword(u));
//   }

//   create(dto: CreateUserDto) {
//     const user = new User();
//     Object.assign(user, {
//       id: uuid(),
//       login: dto.login,
//       password: dto.password,
//       version: 1,
//       createdAt: Date.now(),
//       updatedAt: Date.now(),
//     });
//     this.db.create('users', user);
//     return this.stripPassword(user);
//   }

//   private stripPassword(user) {
//     const { password, ...rest } = user;
//     return rest;
//   }
// }
