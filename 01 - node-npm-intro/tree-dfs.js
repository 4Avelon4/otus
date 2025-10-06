function printTree(node, prefix = "") {
    const stack = [{node, prefix, isLast: true}];

    while (stack.length > 0) {
        const {node, prefix, isLast} = stack.pop();
        const branchSymbol = isLast ? "└── " : "├── ";

        console.log(prefix + branchSymbol + node.name);

        if (node.items && node.items.length > 0) {
            const indentSymbols = isLast ? "    " : "│   ";
            const newPrefix = prefix + indentSymbols;
            const lastIndex = node.items.length - 1;

            for (let i = lastIndex; i >= 0; i--) {
                const isLastChild = i === lastIndex;

                stack.push({
                    node: node.items[i],
                    prefix: newPrefix,
                    isLast: isLastChild
                });
            }
        }
    }
}

function normalizeOutput(output) {
    return output.trim();
}

const data = {
    "name": 1,
    "items": [
        {
            "name": 2,
            "items": [{ "name": 3 }, { "name": 4 }]
        },
        {
            "name": 5,
            "items": [{ "name": 6 }]
        }
    ]
};

printTree(data);