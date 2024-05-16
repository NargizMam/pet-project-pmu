import { useEffect, useState } from 'react';


const AdminDashboard = () => {
const [appointments, setAppointments] = useState([]);

useEffect(() => {
  // Получаем данные о записях с сервера с помощью API
  fetchAppointments();
}, []);



const handleApprove = (appointmentId) => {
  // Реализуйте функцию подтверждения записи
  // Отправьте запрос на сервер для изменения статуса записи на "подтвержден"
};

const handleReject = (appointmentId) => {
  // Реализуйте функцию отклонения записи
  // Отправьте запрос на сервер для изменения статуса записи на "отклонен"
};

return (
  <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell>Имя клиента</TableCell>
          <TableCell>Дата и время</TableCell>
          <TableCell>Мастер</TableCell>
          <TableCell>Статус</TableCell>
          <TableCell>Действия</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {appointments.map((appointment) => (
          <TableRow key={appointment.id}>
            <TableCell>{appointment.clientName}</TableCell>
            <TableCell>{appointment.dateTime}</TableCell>
            <TableCell>{appointment.masterName}</TableCell>
            <TableCell>{appointment.status}</TableCell>
            <TableCell>
              {appointment.status === 'pending' && (
                <>
                  <Button variant="contained" color="primary" onClick={() => handleApprove(appointment.id)}>Подтвердить</Button>
                  <Button variant="contained" color="secondary" onClick={() => handleReject(appointment.id)}>Отклонить</Button>
                </>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
)};

export default AdminDashboard;
