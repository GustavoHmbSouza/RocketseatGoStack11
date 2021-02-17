import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';

import CreateUserService from '../services/CreateUserService';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

import UpdateUserAvatarService from '../services/UpdateUserAvatar';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
	const { name, email, password } = request.body;

	const createUserService = new CreateUserService();

	const user = await createUserService.execute({ name, email, password });

	delete user.password;

	return response.json(user);
});

usersRouter.patch(
	'/avatar',
	ensureAuthenticate,
	upload.single('avatar'),
	async (request, response) => {
		const userAvatarService = new UpdateUserAvatarService();

		const user = await userAvatarService.execute({
			user_id: request.user.id,
			avatarFileName: request.file.filename,
		});

		delete user.password;

		return response.json(user);
	},
);

export default usersRouter;
