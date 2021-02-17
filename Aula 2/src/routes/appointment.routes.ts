import { Router } from 'express';
import { startOfHour, parseISO, isEqual, parse } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentsRepository from '../repositories/AppointmentRepository';
import CreateAppontmentService from '../services/CreateAppointmentService';

import ensureAuthenticate from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticate);

appointmentsRouter.get('/', async (request, response) => {
	const appointmentsRepository = getCustomRepository(AppointmentsRepository);
	const appointments = await appointmentsRepository.find();

	return response.json(appointments);
});

appointmentsRouter.post('/', async (request, response) => {
	const { provider_id, date } = request.body;

	const parseDate = parseISO(date);

	const createAppontment = new CreateAppontmentService();

	const appointment = await createAppontment.execute({
		provider_id,
		date: parseDate,
	});

	return response.json(appointment);
});

export default appointmentsRouter;
