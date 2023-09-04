import { RiskAssessmentHazard } from "./riskAssessmentHazardClass.js";

fetch('../riskHazardDatabase.JSON')
  .then(response => response.json())
  .then(data => {
    console.log(data)
    main(data)
  })
  .catch(error => {
    console.error('Error:', error);
  });

function main(data) {
  let catagoryContainers = getCatagoryContainers()
  console.log(catagoryContainers['Vulnerable Details and Material Hazards'])

  let database = data['Hazard Database']

  for (let hazard in database) {
    console.log(hazard)

    let hazardSubCat = database[hazard]['Catagory'];
    let hazardInfo = database[hazard];
    let hazardContainer = document.createElement('div')
    hazardContainer.className = 'collapsable-content'
    
    catagoryContainers[hazardSubCat].appendChild(hazardContainer);

    console.log(hazardSubCat, hazardInfo, hazardContainer)

    new RiskAssessmentHazard(hazardContainer, hazardInfo, hazard)
  }

  setCategoryButtons()
  setScrollButton()
}

function getCatagoryContainers() {
  let catagoryContainerElements = {
    'Vulnerable Details and Material Hazards': document.getElementById('Vulnerable Details and Material Hazards - Inner Content Container'),
    'Condition Hazards - External': document.getElementById('Condition Hazards - External - Inner Content Container'),
    'Condition Hazards - Internal': document.getElementById('Condition Hazards - Internal - Inner Content Container'),
    'History Hazards': document.getElementById('History Hazards - Inner Content Container'),
    'Assessment Hazards': document.getElementById('Assessment Hazards - Inner Content Container')
  }

  return catagoryContainerElements
}

function setCategoryButtons() {
  let vulnerableButton = document.getElementById('Vulnerable Detail Button');
  let conditionExternalButton = document.getElementById('Condition External Button');
  let conditionInternalButton = document.getElementById('Condition Internal Button');
  let historyButton = document.getElementById('History Button');
  let assessmentButton = document.getElementById('Assessment Button');

  let vulnerableContent = document.getElementById('Vulnerable Details and Material Hazards');
  let conditionExternalContent = document.getElementById('Condition Hazards - External');
  let conditionInternalContent = document.getElementById('Condition Hazards - Internal');
  let historyContent = document.getElementById('History Hazards');
  let assessmentContent = document.getElementById('Assessment Hazards');

  let categoryContentContainers = {
    'Vulnerable Details and Material Hazards': vulnerableContent,
    'Condition Hazards - External': conditionExternalContent,
    'Condition Hazards - Internal': conditionInternalContent,
    'History Hazards': historyContent,
    'Assessment Hazards': assessmentContent
  };

  let categoryButtons = {
    'Vulnerable Details and Material Hazards': vulnerableButton,
    'Condition Hazards - External': conditionExternalButton,
    'Condition Hazards - Internal': conditionInternalButton,
    'History Hazards': historyButton,
    'Assessment Hazards': assessmentButton
  };

  setActiveCategory(categoryContentContainers, 'Vulnerable Details and Material Hazards', categoryButtons);

  vulnerableButton.addEventListener('click', () => {
    setActiveCategory(categoryContentContainers, 'Vulnerable Details and Material Hazards', categoryButtons);
  });
  conditionExternalButton.addEventListener('click', () => {
    setActiveCategory(categoryContentContainers, 'Condition Hazards - External', categoryButtons);
  });
  conditionInternalButton.addEventListener('click', () => {
    setActiveCategory(categoryContentContainers, 'Condition Hazards - Internal', categoryButtons);
  });
  historyButton.addEventListener('click', () => {
    setActiveCategory(categoryContentContainers, 'History Hazards', categoryButtons);
  });
  assessmentButton.addEventListener('click', () => {
    setActiveCategory(categoryContentContainers, 'Assessment Hazards', categoryButtons);
  });
}

function setActiveCategory(categoryContainers, activeCategory, categoryButtons) {
  for (let container in categoryContainers) {
    if (container === activeCategory) {
      categoryContainers[container].classList.add('visible-content');
      categoryContainers[container].classList.remove('collapsed-content');

      categoryButtons[container].classList.add('selected');
    } else {
      categoryContainers[container].classList.remove('visible-content');
      categoryContainers[container].classList.add('collapsed-content');

      categoryButtons[container].classList.remove('selected');
    }
  }
}

function setScrollButton() {
  let myButton = document.getElementById("myBtn");
  myButton.addEventListener('click', () => {
    scrollToTop()
  })

  // Show the button when the user scrolls down 20px from the top
  window.onscroll = function() {
    scrollFunction();
  };

  function scrollFunction() {
    let myButton = document.getElementById("myBtn");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      myButton.style.display = "block";
    } else {
      myButton.style.display = "none";
    }
  }

  // Scroll to the top when the button is clicked
  function scrollToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
  }
}

