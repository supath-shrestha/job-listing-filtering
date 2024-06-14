import data from './data.json' with {type: 'json'}

let filterValueList = []


const updateTabletContainer = () => {
    let tabletContainer = document.querySelector('.tablet-container')
    let skillsList = null


    for (let i = 0; i < tabletContainer.childElementCount; i++) {
        const element = tabletContainer.children[i];

        // to show already hidden tablets/jobs
        element.classList.remove('hide')

        skillsList = []
        skillsList.push(data[i]['role'])
        skillsList.push(data[i]['level'])
        skillsList = [...skillsList, ...data[i]['tools'], ...data[i]['languages']]


        // to check if tablet/jobs contains all filter value
        let isSubset = filterValueList.every((val) => {
            return skillsList.includes(val)
        })


        // hide tablet/jobs which does not contain all filtered values
        if (!isSubset) {
            element.classList.add('hide')
        }
    }
}


const createFilterBox = () => {
    let filterBox = document.createElement('div')
    let filterContent = document.createElement('div')
    let clearText = document.createElement('span')

    filterBox.classList.add('filter-box')

    filterContent.classList.add('filter-content')

    clearText.classList.add('clear-text')
    clearText.appendChild(document.createTextNode('clear'))

    clearText.addEventListener("click", () => {
        filterValueList = []
        updateTabletContainer()
        filterBox.remove()
    })

    filterBox.appendChild(filterContent)
    filterBox.appendChild(clearText)

    document.querySelector('.main').insertBefore(filterBox, document.querySelector('.tablet-container'))
}


const addToFilterContent = (text) => {
    let hasFilterBox = document.querySelector('.filter-box') != null

    if (!hasFilterBox) {
        createFilterBox()
    }

    let filterContent = document.querySelector('.filter-content')
    let isFilterValueRepeated = false

    // check if filter value already exists
    if (filterValueList.includes(text)) {
        isFilterValueRepeated = true
    }

    if (!isFilterValueRepeated) {
        let filterTextBox = document.createElement('div')
        let filterText = document.createElement('span')
        let removeIconBox = document.createElement('div')
        let removeIcon = document.createElement('img')

        filterTextBox.classList.add('filter-text-box')

        filterText.classList.add('filter-text')
        filterText.appendChild(document.createTextNode(text))

        removeIcon.classList.add('remove-icon')
        removeIcon.src = './images/icon-remove.svg'

        removeIconBox.classList.add('remove-icon-box')
        removeIconBox.appendChild(removeIcon)

        removeIconBox.addEventListener('click', () => {
            filterTextBox.remove()

            filterValueList = filterValueList.filter((element) => {
                return element != text
            })

            if (filterContent.childElementCount === 0) {
                document.querySelector('.filter-box').remove()
            }

            updateTabletContainer()
        })

        filterTextBox.appendChild(filterText)
        filterTextBox.appendChild(removeIconBox)

        filterContent.appendChild(filterTextBox)

        filterValueList.push(text)
        updateTabletContainer()
    }
}


const createJobDetailsBox = ({ company, isNew, isFeatured, position, postedAt, contract, location }) => {
    let jobDetailsBox = document.createElement('div')

    let companyDetailsBox = document.createElement('div')
    let companyName = document.createElement('span')
    let newBox = document.createElement('div')
    let featuredBox = document.createElement('div')

    let positionText = document.createElement('span')

    //bottom section includes postedAt, contract and location
    let bottomSection = document.createElement('div')
    let postedAtText = document.createElement('span')
    let contractText = document.createElement('span')
    let locationText = document.createElement('span')


    jobDetailsBox.classList.add('job-details-box')

    companyDetailsBox.classList.add('company-details-box')

    companyName.classList.add('company-name')
    companyName.appendChild(document.createTextNode(company))

    newBox.classList.add('new-box')
    newBox.appendChild(document.createTextNode('New!'))

    featuredBox.classList.add('featured-box')
    featuredBox.appendChild(document.createTextNode('Featured'))

    companyDetailsBox.appendChild(companyName)
    if (isNew) companyDetailsBox.appendChild(newBox)
    if (isFeatured) companyDetailsBox.appendChild(featuredBox)


    positionText.classList.add("position-text")
    positionText.appendChild(document.createTextNode(position))

    bottomSection.classList.add('job-details-box-bottom-section')

    postedAtText.classList.add('posted-at-text')
    postedAtText.appendChild(document.createTextNode(postedAt))

    contractText.classList.add('contract-text')
    contractText.appendChild(document.createTextNode(contract))

    locationText.classList.add('location-text')
    locationText.appendChild(document.createTextNode(location))

    bottomSection.appendChild(postedAtText)
    bottomSection.appendChild(contractText)
    bottomSection.appendChild(locationText)

    jobDetailsBox.appendChild(companyDetailsBox)
    jobDetailsBox.appendChild(positionText)
    jobDetailsBox.appendChild(bottomSection)

    return jobDetailsBox
}


const createSkillsBox = ({ role, level, languages, tools }) => {
    let skillsBox = document.createElement('div')
    let roleText = document.createElement('span')
    let levelText = document.createElement('span')

    skillsBox.classList.add('skills-box')

    roleText.classList.add('skill')
    roleText.appendChild(document.createTextNode(role))

    levelText.classList.add('skill')
    levelText.appendChild(document.createTextNode(level))

    skillsBox.appendChild(roleText)
    skillsBox.appendChild(levelText)

    if (languages != null) {
        for (let i = 0; i < languages.length; i++) {
            const element = document.createElement('span');
            element.classList.add('skill')
            element.appendChild(document.createTextNode(languages[i]));
            skillsBox.appendChild(element)
        }
    }

    if (tools != null) {
        for (let i = 0; i < tools.length; i++) {
            const element = document.createElement('span');
            element.classList.add('skill')
            element.appendChild(document.createTextNode(tools[i]));
            skillsBox.appendChild(element)
        }
    }

    return skillsBox
}


const createTablet = (job) => {
    let tablet = document.createElement('div')
    let logo = document.createElement('img')
    let jobDetailsBox = createJobDetailsBox(job)
    let skillsBox = createSkillsBox(job)
    let lineBreak = document.createElement('div')

    tablet.id = job['id']
    tablet.classList.add('tablet')

    logo.classList.add('logo')
    logo.src = job['logo']

    lineBreak.classList.add('line-break')

    tablet.appendChild(logo)
    tablet.appendChild(jobDetailsBox)
    tablet.appendChild(lineBreak)
    tablet.appendChild(skillsBox)

    return tablet
}


const createTabletContainer = () => {
    let tabletContainer = document.createElement('div')

    tabletContainer.classList.add('tablet-container')

    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let tablet = createTablet(element)
        tabletContainer.appendChild(tablet)
    }

    return tabletContainer
}

document.querySelector('.main').appendChild(createTabletContainer())


let allSkillsList = document.querySelectorAll('.skill')

for (let i = 0; i < allSkillsList.length; i++) {
    const element = allSkillsList[i];
    element.addEventListener("click", (e) => {
        addToFilterContent(e.target.textContent)
    })

}

