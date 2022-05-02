const zodiacDatabase = [
    {
        period: '21.01-19.02',
        name: {
            en: 'Water-bearer',
            ru: 'Водолей',
        },
    },
    {
        period: '20.02-20.03',
        name: {
            en: 'Fish',
            ru: 'Рыбы',
        },
    },
    {
        period: '21.03-20.04',
        name: {
            en: 'Ram',
            ru: 'Овен',
        },
    },
    {
        period: '21.04-21.05',
        name: {
            en: 'Bull',
            ru: 'Телец',
        },
    },
    {
        period: '22.05-21.06',
        name: {
            en: 'Twins',
            ru: 'Близнецы',
        },
    },
    {
        period: '22.06-22.07',
        name: {
            en: 'Crab',
            ru: 'Рак',
        },
    },
    {
        period: '23.07-21.08',
        name: {
            en: 'Lion',
            ru: 'Лев',
        },
    },
    {
        period: '22.08-23.09',
        name: {
            en: 'The Maiden',
            ru: 'Дева',
        },
    },
    {
        period: '24.09-23.10',
        name: {
            en: 'Scales',
            ru: 'Весы',
        },
    },
    {
        period: '24.10-22.11',
        name: {
            en: 'Scorpion',
            ru: 'Скорпион',
        },
    },
    {
        period: '23.11-22.12',
        name: {
            en: 'Archer',
            ru: 'Стрелец',
        },
    },
    {
        period: '23.12-20.01',
        name: {
            en: 'Sea goat',
            ru: 'Козерог',
        },
    },
];

function getZodiac({day, month}) {
    const dayYear = getDayYear(day, month);
    
    const zodiac = zodiacDatabase.filter(item => {
        const [from, to] = item.period.split('-').map(item => {
            let [day, month] = item.split('.');
            day = parseInt(day);
            month = parseInt(month);

            return {
                day,
                month
            };
        });
    
        const min = getDayYear(from.day, from.month);
        const max = getDayYear(to.day, to.month);
        
        if(dayYear >= min && dayYear <= max) {
            return item;
        }
        if(max < min && (dayYear <= max || dayYear >= min)) {
            return item;
        }
    });

    return zodiac[0];
}

function getDayYear(day, month) {
    month = month - 1;
    
    const february = (month > 1) ? 2 : 0;
    
    return month * 31 - parseInt(month / 2) - february + day;
}
