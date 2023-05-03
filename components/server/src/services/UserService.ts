import UserRepository from "../db/user";

export default class UserService {
  userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  getBasicInfoById = async (id: number) => {
    return this.userRepository.getBasicInfoById(id);
  };
}
