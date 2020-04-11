import Sequelize, { Model } from 'sequelize';
import { format, parse, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
// import { format } from 'date-fns-tz';

const getAge = birthDate =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        birth_date: Sequelize.DATE,
        weight: Sequelize.NUMBER,
        height: Sequelize.NUMBER,
        // birth_date_formatted: {
        //   type: Sequelize.VIRTUAL,
        //   get() {

        //   },
        // },
        age: {
          type: Sequelize.VIRTUAL,
          get() {
            return getAge(this.getDataValue('birth_date'));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Student;
