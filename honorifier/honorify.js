// Checks to see if the input is a special case
function special(input) {
    switch (input) {
        case "갔다오다":
            output = "다녀오시다";
            break;
        case "먹다":
            output = "드시다/잡수시다";
            break;
        case "있다":
            output = "있으시다/계시다";
            break;
        case "자다":
            output = "주무시다";
            break;
        case "아프다":
            output = "편찮으시다";
            break;
        case "죽다":
            output = "돌아가시다";
            break;
        case "말하다":
            output = "말씀하시다";
            break;
        case "마시다":
            output = "드시다";
            break;
        case "데리다":
            output = "모시다";
            break;
        case "걷다":
            output = "걸으시다";
            break;
        case "깨닫다":
            output = "깨달으시다";
            break;
        case "듣다":
            output = "들으시다";
            break;
        case "묻다":
            output = "물으시다/묻으시다";
            break;
        case "싣다":
            output = "실으시다";
            break;
        default:
            output = false;
            break;
    }
    return output;
}

function getBatchim(inputChar) {
    return (inputChar - 44032) % 588 % 28;
}

function honorify(input) {
    // console.log(`The input is ${input}`);
    let len = input.length;
    if (len < 2) {
        console.error("This is not a valid input!");
        return;
    }

    // the input must be verbs/adjectives in base form
    if (input[len-1] != "다") {
        console.error(`${input} is definitely not in base form!`);
        return;
    }

    let potentiallySpecial = special(input);
    if (potentiallySpecial) {
        console.log(`${input} is a special exception and has its own rule!`);
        return potentiallySpecial;
    }

    let criticalBlock = input.charCodeAt(len-2);
    // console.log(`The critical block is ${String.fromCharCode(criticalBlock)}`);
    if (String.fromCharCode(criticalBlock) === '시') {
        console.error("Are you sure this isn't already in honorific form?");
    }

    let batchim = getBatchim(criticalBlock);
    // console.log(`The 받침 is ${String.fromCharCode(batchim)}`);

    // 니은 / 리을
    if (batchim === 4 || batchim === 8) {
        return `${input.substring(0,len-2)}${String.fromCharCode(criticalBlock-batchim)}시다`;
    }

    // 비읍
    if (batchim === 17) {
        return `${input.substring(0,len-2)}${String.fromCharCode(criticalBlock-batchim)}우시다`;
    }

    if (batchim > 0) {
        return `${input.substring(0,len-1)}으시다`;
    }

    return `${input.substring(0,len-1)}시다`
}

function unit_tests() {
    let arr = [
        "명사",
        "아프다",
        "굽다",
        "움직이다",
        "놀다",
        "괜찮다",
        "드시다",
        "하시다",
    ];
    arr.forEach(e => {
        console.log(`${e} -> ${honorify(e)}`);
    })
}

unit_tests();