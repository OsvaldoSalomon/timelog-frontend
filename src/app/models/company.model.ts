import { Project } from './project.model';
import { User } from './user.model';

export class Company {

  constructor(
    public id: string,
    public name: string,
    public projectList: Array<Project>,
    public userList: Array<User>
  ) {}

}
