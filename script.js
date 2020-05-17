(function () {
    /****************** Populate data ***********************/

    let data = ["Item1", "Item2", "Item3"];

    function buildSelectOptions(options) {
        let output = "";
        for (let i = 0; i < options.length; i++) {
            output += `<option value="${(i + 1)}">${options[i]}</option>`;
        }
        return output;
    }

    let nameList = $("#left-name-list-1");
    nameList.html(buildSelectOptions(data));

    /*******************************************************/

    let errorMessage1 = $(".error-message-1");
    errorMessage1.text(`Pick the values you want from the
    left and move them to the right.`);

    function handleSubmitClick(e) {
        let valuesToSubmit = $("#selected-values-1").val();
        (valuesToSubmit) ? alert(`Submitting values - ${valuesToSubmit}`) : e.preventDefault();
    }

    function handleResetClick(e) {
        nameList.html(buildSelectOptions(data));
        let nameListOnRight = $("#right-name-list-1").get(0).options;
        $(nameListOnRight).remove();
        $("#selected-values-1").val('');
        e.preventDefault();
    }

    function handleMoveItemsClick(e) {
        // Use the 'data-nth-select-pair' attribute to build the id of
        // the pair of selector boxes to manipulate, if there are more
        // than one pair of select boxes -

        /*
            let nthSelectPair = $(this).get(0).dataset.nthSelectPair');
            let nthLeftNameList = '#left-name-list-' + nthSelectPair;
            let nthRightNameList = '#right-name-list-' + nthSelectPair;
            let nthOutputDataField = '#selected-values-1' + nthSelectPair;
        */

        let nameListOnLeft = $("#left-name-list-1");
        let nameListOnRight = $("#right-name-list-1");
        let outputDataField = $("#selected-values-1");
        let moveDirection = $(this).data("moveDirection");
        if (moveDirection === "right") {
            moveItems(nameListOnLeft, nameListOnRight);
        } else if (moveDirection === "left") {
            moveItems(nameListOnRight, nameListOnLeft);
        }
        updateDataFields(outputDataField, nameListOnRight);
        e.preventDefault();
    }

    function moveItems(moveFrom, moveTo) {
        let itemsToMove = moveFrom.get(0).selectedOptions;
        if (itemsToMove.length > 0) {
            //Move options to designated select box
            moveTo.append($(itemsToMove).clone());
            $(itemsToMove).remove();
            errorMessage1.css("display", "none");
        } else {
            errorMessage1.css("display", "block");
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
    $('button[type="submit"].btn.btn-primary').click(handleSubmitClick);
    $('button[type="reset"].btn.btn-secondary').click(handleResetClick);

})();