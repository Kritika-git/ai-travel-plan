export const SelectTravelersList=[
{
    id:1,
    title:'Just Me',
    desc:'Solo Adventurer',
    people:'1'
   
},
{
    id:2,
    title:'A Couple',
    desc:'Romantic Getaway',
    people:'2 People'
},
{
    id:3,
    title:'Family',
    desc:'Creating lasting memories',
    people:'3 to 5 People'
},
{
    id:4,
    title:'Friends',
    desc:'Thrill Seekers',
    people:'5 to 10 People'

}

]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Stay conscious of costs',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Keep costs on Average side',
    },
    {
        id:3,
        title:'Luxury',
        desc:'No need to worry about costs',
    }
]

export const AI_PROMPT='Generate Travel Plan for Location: {location} for {noOfDays} Days for {noOfPeople} with {budget} budget.Give me Hotel options list with Hotelname, Hotel address, Hotel image URL, Hotel pricing, rating, geo coordinates , description and suggest itinarary with Place Name,Place details, place image url, geo coordinates, ticket pricing, rating, time travel each of location for {noOfDays} days with each day plan and best time to visit in JSON format'