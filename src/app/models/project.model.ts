import { User } from "./user.model";

export class  Project {

  constructor(
    public id:string,
    public name:string,
    public company:string,
    public userList:Array<User>
  ) { }

}
