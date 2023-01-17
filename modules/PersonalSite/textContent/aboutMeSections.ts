import Company from '../types/Company'
import Carvana from './companies/Carvana'
import Endeavor from './companies/Endeavor'
import USAA from './companies/USAA'

const textContent = {
    birthday: 'October 4th 1990',
    birthplace: 'Houston, Tx',
    family: {
        father: 'Austin Felix Obeng Jr',
        mother: 'Vanessa Lynn Obeng',
        daughter: 'Eryn Nicole Kwakwa Obeng',
        brothers: ['Austin Felix Obeng III', 'Ronald Andre Myers'],
        fiance: 'Breoshshala Katara Tajia Martin',
        dog: 'Quavo Obeng',
    },
    education: {
        highSchool: 'George Bush High School',
        middleSchool: 'Holub Middle School',
        elementarySchools: [
            'Hicks Elementary',
            'Chambers Elementary',
            'Aj Martin Elementary',
        ],
        college: 'Texas A&M University - Corpus Christi',
        degree: 'Bachelor of Science in Computer Science',
    },
    career: {
        companies: [USAA, Endeavor, Carvana],
    },
}

export default textContent
