(function () {
    /****************** Populate data ***********************/

    let data = ["Item1", "Item2", "Item3"];

    function buildSelectOptions(options) {
        let output = "";
        for (let i = 0; i < options.length; i++) {
            output += `<option value="${i}">${options[i]}</option>`;
        }
        return output;
    }

    let ecNameList = document.getElementById("left-name-list-1");

    ecNameList.innerHTML = buildSelectOptions(data);

    /*******************************************************/

    let errorMessage1 = document.querySelector(".error-message-1");
    errorMessage1.innerHTML =
        `Pick the values you want from the
        left and move them to the right.`;

    function handleMoveItemsClick(e) {
        // Use the 'data-nth-select-pair' attribute to build the id of
        // the pair of selector boxes to manipulate, if there are more
        // than one pair of select boxes to move items between -

        /*
            let nthSelectPair = $(this).get(0).dataset.nthSelectPair');
            let nthLeftNameList = '#left-name-list-' + nthSelectPair;
            let nthRightNameList = '#right-name-list-' + nthSelectPair;
            let nthOutputDataField = '#selected-values-1' + nthSelectPair;
        */

        let nameListOnLeft = $("#left-name-list-1");
        let nameListOnRight = $("#right-name-list-1");
        let outputDataField = $("#selected-values-1");
        let moveDirection = $(this).get(0).dataset.moveDirecton;
        if (moveDirection === "right") {
            moveItems(nameListOnLeft, nameListOnRight);
        } else if (moveDirection === "left") {
            moveItems(nameListOnRight, nameListOnLeft);
        }
        updateDataFields(nameListOnRight, outputDataField);
        e.preventDefault();
    }

    function moveItems(moveFrom, moveTo, moveDirection) {
        let itemsToMove = moveFrom.get(0).selectedOptions;
        if (itemsToMove.length > 0) {
            //Move options to designated select box
            moveTo.append($(itemsToMove).clone());
            $(itemsToMove).remove();
            errorMessage1.style.display = "none";
        } else {
            errorMessage1.style.display = "block";
        }
    }

    function updateDataFields(fieldToUpdate, dataSource) {
        let values = [];
        $(dataSource.get(0).options).each(function () {
            values.push($(this).val());
        });
        fieldToUpdate.val(values);
    }

    $(".move-item-btns button").click(handleMoveItemsClick);

})();