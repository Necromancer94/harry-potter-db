const queries = {
    genderQuery : 'filter[gender_eq]',
    houseQuery :'filter[house_eq]',
    nohouseQuery : 'filter[house_blank]',
    nameStartQuery : 'filter[name_start]',
    nonHumanQuery : 'filter[species_not_cont]',
    pageQuery : 'page[number]',
    deadQuery: 'filter[died_not_null]',
    sortQuery: 'sort'
}

export default queries;