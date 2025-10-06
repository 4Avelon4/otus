function printTree(root) {
    const queue = [{node: root, prefix: "", isLast: true}];

    while (queue.length > 0) {
        const {node, prefix, isLast} = queue.shift();

        const branch = isLast ? "└── " : "├── ";
        console.log(prefix + branch + node.name);

        if (node.items?.length > 0) {
            const newPrefix = prefix + (isLast ? "    " : "│   ");
            const lastIndex = node.items.length - 1;

            for (let i = 0; i < node.items.length; i++) {
                queue.push({
                    node: node.items[i],
                    prefix: newPrefix,
                    isLast: i === lastIndex
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