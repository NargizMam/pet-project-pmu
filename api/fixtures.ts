import mongoose from 'mongoose';
import config from "./config";
import User from "./models/users/userModel";
import PreviousProcedure from "./models/previousProcedur/previousProcedurModel";
import Service from "./models/service/servicesModel";
import Master from "./models/master/masterModel";
import Client from "./models/client/clientModel";
import Appointment from "./models/appontment/appointmentModel";
import Slot from './models/slot/slotModel';


const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing. skipping drop ...`);
    }
};
const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;
    const collections = ['users', 'masters', 'clients', 'services', 'appointments', 'previous-procedures'];
    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }
    const [user1, user2, admin, userMaster1, userMaster2] = await User.create(
        {
            email: 'user1@example.com',
            password: 'password1',
            token: crypto.randomUUID(),
            role: 'user',
            displayName: 'User One',
            mobile: '1234567890',
            avatar: 'user1.jpg',
        },
        {
            email: 'user2@example.com',
            password: 'password2',
            token: crypto.randomUUID(),
            role: 'user',
            displayName: 'User Two',
            mobile: '9876543210',
            avatar: 'user2.jpg',
        },
        {
            email: 'admin@example.com',
            password: 'admin',
            token: crypto.randomUUID(),
            role: 'admin',
            displayName: 'Admin',
            mobile: '5555555555',
            avatar: 'admin.jpg',
        },
        {
            email: 'master1@example.com',
            password: 'master',
            token: crypto.randomUUID(),
            role: 'master',
            displayName: 'Master PMU',
            mobile: '5555555555',
            avatar: 'admin.jpg',
        },
        {
            email: 'master2@example.com',
            password: 'master',
            token: crypto.randomUUID(),
            role: 'master',
            displayName: 'Master PMU',
            mobile: '5555555555',
            avatar: 'admin.jpg',
        });

    const [previousProcedure1, previousProcedure2] = await PreviousProcedure.create({
            type: 'PMU Eyes',
            date: new Date(),
            notes: 'Procedure 1 notes',
            photos: ['photo1.jpg', 'photo2.jpg'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            type: 'PMU Lips',
            date: new Date(),
            notes: 'Procedure 2 notes',
            photos: ['photo3.jpg', 'photo4.jpg'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });

    const [client1, client2] = await Client.create({
            user: user1._id,
            fullName: 'Client One',
            contact: 'client1@example.com',
            birthday: new Date(),
            gender: 'female',
            notes: 'Client 1 notes',
            referredBy: 'Referred by someone',
            previousProcedures: [previousProcedure1],
            photos: ['photo1.jpg', 'photo2.jpg'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        },
        {
            user: user2._id,
            fullName: 'Client Two',
            contact: 'client2@example.com',
            birthday: new Date(),
            gender: 'male',
            notes: 'Client 2 notes',
            referredBy: 'Referred by another client',
            previousProcedures: [previousProcedure2],
            photos: ['photo1.jpg', 'photo2.jpg'],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });


    const [master1, master2] = await Master.create({
        user: userMaster1._id,
        fullName: 'Master One',
        specialization: 'Specialization 1',
        phone: '1234567890',
        backgroundInfo: 'Background information',
        experience: 5,
        workingHours: new Map([['Monday', '10:00 - 18:00'], ['Tuesday', '10:00 - 18:00']]),
        profileImage: 'fixtures/master.jpg',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
        {
            user: userMaster2._id,
            fullName: 'Master Two',
            specialization: 'Specialization 1',
            phone: '999999999999',
            backgroundInfo: 'Background information',
            experience: 5,
            workingHours: new Map([['Thursday', '10:00 - 18:00'], ['Wednesday', '10:00 - 18:00']]),
            profileImage: 'fixtures/master.jpg',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        });
    const [service1, service2, service3] = await Service.create({
            title: 'PMU Eyes',
            price: 100,
            description: 'Description of Service One',
            duration: '1 hour',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            master: master1._id,
        }, {
            title: 'PMU Lips',
            price: 150,
            description: 'Description of Service Two',
            duration: '1.5 hours',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            master: master2._id,
        },
        {
            title: 'PMU Eyebrows',
            price: 350,
            description: 'Description of Service Two',
            duration: '3.5 hours',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            master: master1._id,

        });
    await Slot.create(
      {
        master: master1._id,
        date: '2024-05-17',
        availableSlots: ['09:00', '10:00', '11:00'],
      },
      {
        master: master2._id,
        date: '2024-05-18',
        availableSlots: ['13:00', '14:00', '15:00'],
      },
      {
        master: master1._id,
        date: '2024-05-19',
        availableSlots: ['10:00', '12:00', '14:00'],
      },
    )
    const appointment1 = await Appointment.create({
        master: master1._id,
        client: client1._id,
        date: new Date(),
        time: '10:00',
        status: 'confirmed',
        service: service1._id,
        notes: 'AppointmentReactSchedule notes',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    });


    await db.close();
};

void run();
