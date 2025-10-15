import {normalizeOutput, printTree, TreeNode} from "./tree-recursion";

describe('Нормализация вывода', () => {
    describe('когда передается строка с пробелами', () => {
        it('должна возвращать строку без начальных и конечных пробелов', () => {
                const str = ' text string   '

                const result = normalizeOutput(str);

                expect(result).toEqual('text string');
        });
    });

    describe('когда передается пустая строка', () => {
        it('должна возвращать пустую строку', () => {
                const str = '    '

                const result = normalizeOutput(str);

                expect(result).toEqual('');
        });
    });
});

describe('Визуализация дерева', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('когда передается простой узел', () => {
        it('должна отображать только корневой элемент', () => {
            const tree: TreeNode = { name: 'root' };

            printTree(tree);

            expect(consoleSpy).toHaveBeenCalledWith('└── root');
        });
    });

    describe('когда передается дерево с потомками', () => {
        it('должна отображать иерархию с правильными отступами', () => {
            const tree: TreeNode = {
                name: 1,
                items: [
                    { name: 2 },
                    { name: 3 }
                ]
            };

            printTree(tree);

            expect(consoleSpy).toHaveBeenCalledTimes(3);
            expect(consoleSpy).toHaveBeenNthCalledWith(1, '└── 1');
            expect(consoleSpy).toHaveBeenNthCalledWith(2, '    ├── 2');
            expect(consoleSpy).toHaveBeenNthCalledWith(3, '    └── 3');
        });
    });

    describe('когда передается дерево с несколькими ветвями', () => {
        it('должна отображать все ветви с корректными соединениями', () => {
            const tree: TreeNode = {
                name: 'A',
                items: [
                    {
                        name: 'B',
                        items: [
                            { name: 'C' },
                            { name: 'D' }
                        ]
                    },
                    { name: 'E' }
                ]
            };

            printTree(tree);

            expect(consoleSpy).toHaveBeenCalledWith('└── A');
            expect(consoleSpy).toHaveBeenCalledWith('    ├── B');
            expect(consoleSpy).toHaveBeenCalledWith('    │   ├── C');
            expect(consoleSpy).toHaveBeenCalledWith('    │   └── D');
            expect(consoleSpy).toHaveBeenCalledWith('    └── E');
        });
    });

    describe('когда передается дерево с вложенными поддеревьями', () => {
        it('должна сохранять визуальную структуру для глубокой иерархии', () => {
            const tree: TreeNode = {
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

            printTree(tree);

            expect(consoleSpy).toHaveBeenCalledWith('└── 1');
            expect(consoleSpy).toHaveBeenCalledWith('    ├── 2');
            expect(consoleSpy).toHaveBeenCalledWith('    │   ├── 3');
            expect(consoleSpy).toHaveBeenCalledWith('    │   └── 4');
            expect(consoleSpy).toHaveBeenCalledWith('    └── 5');
            expect(consoleSpy).toHaveBeenCalledWith('        └── 6');
        });
    });
});

