export interface TreeNode {
    name: string | number;
    items?: TreeNode[];
}

export function printTree(
    node: TreeNode,
    prefix: string = "",
    isLast: boolean = true
) {
    const nodePrefix = isLast ? "└── " : "├── ";

    console.log(prefix + nodePrefix + node.name);

    if (node.items && node.items.length > 0) {
        const indentSymbols = isLast ? "    " : "│   ";
        const newPrefix = prefix + indentSymbols;

        for (let i = 0; i < node.items.length; i++) {
            const isLastChild = i === node.items.length - 1;

            printTree(node.items[i], newPrefix, isLastChild);
        }
    }
}

export function normalizeOutput(output: string) {
    return output.trim();
}

const data: TreeNode = {
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