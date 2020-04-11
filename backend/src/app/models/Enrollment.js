import Sequelize, { Model } from 'sequelize';
import {
  isBefore,
  isAfter,
  differenceInDays,
  format,
  parseISO,
} from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

class Enrollment extends Model {
  static init(sequelize) {
    super.init(
      {
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        price: Sequelize.NUMBER,
        days_remaining: {
          type: Sequelize.VIRTUAL,
          get() {
            return differenceInDays(this.end_date, new Date());
          },
        },
        start_date_formatted: {
          type: Sequelize.VIRTUAL,
          get() {
            return format(this.get('start_date'), "d 'de' MMMM 'de' yyyy", {
              locale: pt,
            });
          },
        },
        end_date_formatted: {
          type: Sequelize.VIRTUAL,
          get() {
            return format(this.get('end_date'), "d 'de' MMMM 'de' yyyy", {
              locale: pt,
            });
          },
        },
        active: {
          type: Sequelize.VIRTUAL(Sequelize.BOOLEAN, [
            'start_date',
            'end_date',
          ]),
          get() {
            return (
              isBefore(this.get('start_date'), new Date()) &&
              isAfter(this.get('end_date'), new Date())
            );
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Plan, { foreignKey: 'plan_id', as: 'plan' });
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default Enrollment;
