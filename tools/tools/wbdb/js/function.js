function diffUsingJS() {
    // get the baseText and newText values from the two textboxes, and split them into lines
    var base = difflib.stringAsLines($("#baseText").val());
    var newtxt = difflib.stringAsLines($("#newText").val());

    // create a SequenceMatcher instance that diffs the two sets of lines
    var sm = new difflib.SequenceMatcher(base, newtxt);

    // get the opcodes from the SequenceMatcher instance
    // opcodes is a list of 3-tuples describing what changes should be made to the base text
    // in order to yield the new text
    var opcodes = sm.get_opcodes();
    var diffoutputdiv = $("#diffoutput");
    $("#diffoutput").html('');
    //while (diffoutputdiv.firstChild) diffoutputdiv.removeChild(diffoutputdiv.firstChild);
    var contextSize = $("#contextSize").val();
    contextSize = contextSize ? contextSize : null;

    // build the diff view and add it to the current DOM
    diffoutputdiv.append(diffview.buildView({
        baseTextLines: base,
        newTextLines: newtxt,
        opcodes: opcodes,
        // set the display titles for each resource
        baseTextName: "Base Text",
        newTextName: "New Text",
        contextSize: contextSize,
        viewType: parseInt($('input[name="viewType"]:checked').val())
    }));

    // scroll down to the diff view window.
    //location = url + "#diff";
}