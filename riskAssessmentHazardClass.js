export class RiskAssessmentHazard {
    constructor(container, hazardInfo, hazardTitle) {
        console.log(`Row ${hazardTitle} has been intialised`)

        this.buildRow(container, hazardInfo, hazardTitle)
    }

    buildRow(container, hazardInfo, title) {
        let divElement = document.createElement('div');
        divElement.classList.add('collapsed-content')

        this.createTitle(container, title, divElement);
        this.createEventDescription(divElement, hazardInfo);
        this.createAdditionalInfo(divElement, hazardInfo);
        this.createLiklihoodInfo(divElement, hazardInfo);
        this.createConsequence(divElement, hazardInfo);
        this.createRiskManagementMeasures(divElement, hazardInfo);

        container.appendChild(divElement);
    }

    createTitle(container, title, innerContentElement) {
        // Create a title element for the hazard and attach it to the subcategory container
        let titleEl = document.createElement('h3');
        titleEl.innerText = title;
      
        // Create a container div to hold the title and arrow
        let titleContainer = document.createElement('div');
        titleContainer.classList.add('title-container'); // Add a class for styling
        container.appendChild(titleContainer);
      
        // Create a span for the arrow with a class
        let arrowSpan = document.createElement('span');
        arrowSpan.innerText = "➕";
        arrowSpan.classList.add('arrow'); // Add a class for styling the arrow
      
        // Append the arrow span and title to the title container
        titleContainer.appendChild(arrowSpan);
        titleContainer.appendChild(titleEl);
      
        // Add the click event listener to toggle the visible content
        titleContainer.addEventListener('click', () => {
          innerContentElement.classList.toggle('visible-content');
          innerContentElement.classList.toggle('collapsed-content');
      
          if (innerContentElement.classList.contains("visible-content")) {
            arrowSpan.innerText = "➖";
          } else {
            arrowSpan.innerText = "➕";
          }
        });
    }
      

    createEventDescription(container, hazardInfo) {
        // create the event description and add to the catagory container
        let eventDescriptionHeadingEl = document.createElement('h4');
        eventDescriptionHeadingEl.innerText = 'Event Description';
        container.appendChild(eventDescriptionHeadingEl);

        // create a container for the content under the heading
        let divElement = document.createElement('div');
        divElement.classList.add('collapsed-content-inline')

        // create the clipboard icon
        let clipboardEl = this.createClipboardElement(hazardInfo['Event Description'])
        clipboardEl.className = 'clipboard'

        // create the event description paragraph and content
        let eventDescriptionEl = document.createElement('p');
        eventDescriptionEl.className = 'event-descriptor'

        if (hazardInfo['Event Description'] === undefined) {
            eventDescriptionEl.innerText = 'No event description has been defined for this hazard';
        } else {
            eventDescriptionEl.innerText = hazardInfo['Event Description'];
        };

        // add the (inline) div element to the hazards container
        divElement.appendChild(eventDescriptionEl);
        divElement.appendChild(clipboardEl)
        
        container.appendChild(divElement)


        // add the click element to toggle the visible content
        eventDescriptionHeadingEl.addEventListener('click', () => {
            divElement.classList.toggle('visible-content-inline'); // hide content 
            divElement.classList.toggle('collapsed-content-inline'); // display content
        });
    }

    createAdditionalInfo(container, hazardInfo) {
        // check if there is additional info, if not then set the default text
        if (hazardInfo['Additional Info'] === undefined) {
            hazardInfo['Additional Info'] = ['No additional info has been defined for this hazard']; // needs to be within an array to be parsed later
        };
        // create the additional info and add to the catagory container
        let header = document.createElement('h4');
        header.innerText = 'Additional Info';
        container.appendChild(header);

        let divElement = document.createElement('div');
        divElement.classList.add('collapsed-content');

        for (let para of hazardInfo['Additional Info']) {
            let paraElement = document.createElement('p');
            paraElement.innerText = para;
            divElement.appendChild(paraElement);
        };

        container.appendChild(divElement);

        // add the click element to toggle the visible content
        header.addEventListener('click', () => {
            divElement.classList.toggle('visible-content'); // hide description content
            divElement.classList.toggle('collapsed-content'); // hide description content
        });

    }

    createLiklihoodInfo(container, hazardInfo) {
        // create the liklihood info and add to the catagory container
        let header = document.createElement('h4');
        header.innerText = 'Liklihood';
        container.appendChild(header);

        // create the inline div container for the clipboard and content
        let divElement = document.createElement('div');
        divElement.classList.add('collapsed-content-inline')

        // create the clipboard element/icon
        let clipboardEl = this.createClipboardElement(hazardInfo['Liklihood Info'])
        clipboardEl.className = 'clipboard'

        // create a paragraph element for the liklihood info (text)
        let paraElement = document.createElement('p');


        // add the elements to the main hazard container
        divElement.appendChild(paraElement);
        divElement.appendChild(clipboardEl)

        container.appendChild(divElement)

        // check if there is liklihood data for this hazard
        if (hazardInfo['Liklihood Info'] === undefined) {
            paraElement.innerText = 'Liklihood info has not been defined for this hazard';
        } else {
            paraElement.innerText = hazardInfo['Liklihood Info'];
        };

        // add the click element to toggle the visible content
        header.addEventListener('click', () => {
            divElement.classList.toggle('visible-content-inline'); // hide content 
            divElement.classList.toggle('collapsed-content-inline'); // display content
        });
    }

    createConsequence(container, hazardInfo) {
        // create the consequence info and add to the catagory container
        let header = document.createElement('h4');
        header.innerText = 'Consequence';
        container.appendChild(header);

        //get the consequence data from the hazard libary
        let consequence = hazardInfo['Consequence Rating'];
        let consequenceDescription = hazardInfo['Consequence Description'];

        //create a inline dive container
        let divElement = document.createElement('div')
        divElement.classList.add('visible-content-inline')

        //create clipbaord element/icon
        let clipboardEl = this.createClipboardElement(consequenceDescription)
        clipboardEl.className = 'clipboard'

        // create a paragraph element to set the consequence text
        let paragraphElement = document.createElement('p');
        paragraphElement.innerHTML = `<b>(${consequence}):</b> ${consequenceDescription}`;
        container.appendChild(paragraphElement);
        
        // append the elements to the relevant containers
        divElement.appendChild(paragraphElement);
        divElement.appendChild(clipboardEl);
        
        container.appendChild(divElement)
    }

    createRiskManagementMeasures(container, hazardInfo) {
        // create the list of risk managemnet measure and add to the catagory container
        let header = document.createElement('h4');
        header.innerText = 'Risk Management Measures:';
        container.appendChild(header);

        let divElement = document.createElement('div');

        for (let riskMeasure of hazardInfo['Risk Management Measures']) {
            let listElement = document.createElement('li');
            listElement.innerText = riskMeasure;
            divElement.appendChild(listElement)
        }
        
        container.appendChild(divElement)
    }

    // createClipboardElement(textToCopy) {
    //     // create the clipboard element and set the clipboard image
    //     let clipboardEl = document.createElement('img');
    //     clipboardEl.src = "../../Assets/Icons/clipboard-icon.png"
    //     clipboardEl.alt = "Clipboard Icon"
    //     clipboardEl.className = "clipboard"

    //     // add the click element to the image
    //     clipboardEl.addEventListener('click', () => {
    //         //console.log(textToCopy)
    //         clipboardEl.src = "../../Assets/Icons/green-tick.png"
    //         clipboardEl.style.opacity = '1'
    //         setTimeout(() => {
    //             clipboardEl.src = "../../Assets/Icons/clipboard-icon.png"
    //             clipboardEl.style.opacity = ''
    //         }, 1200);

    //         navigator.clipboard.writeText(textToCopy)
    //             .then(() => {
    //                 console.log("Text copied to clipboard: " + textToCopy);
    //             })
    //             .catch(function(error) {
    //                 console.error("Unable to copy text to clipboard: " + error);
    //             });
    //     })
        
    //     return clipboardEl
    // }

    createClipboardElement(textToCopy) {
        // create the clipboard element and set the clipboard image
        let clipboardEl = document.createElement('p');
        clipboardEl.innerText = "📋"
        clipboardEl.className = "clipboard"

        // add the click element to the image
        clipboardEl.addEventListener('click', () => {
            //console.log(textToCopy)
            clipboardEl.innerText = "✔"
            clipboardEl.style.opacity = '1'
            setTimeout(() => {
                clipboardEl.innerText = "📋"
                clipboardEl.style.opacity = ''
            }, 1200);

            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    console.log("Text copied to clipboard: " + textToCopy);
                })
                .catch(function(error) {
                    console.error("Unable to copy text to clipboard: " + error);
                });
        })
        
        return clipboardEl
    }
}