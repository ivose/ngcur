import os

def display_tree(directory, avoid_paths=[], avoid_names=[], indent_level=0, content=False):
    with os.scandir(directory) as entries:
        for entry in entries:
            indent = '  ' * indent_level
            
            # Check if the current path should be avoided
            if any(entry.path.startswith(avoid_path) for avoid_path in avoid_paths):
                continue
            if any(avoid_name in entry.name for avoid_name in avoid_names):
                continue
            
            if entry.is_dir():
                print(f"{indent}[DIR] {entry.name}{os.sep}")
                display_tree(
                    directory=entry.path,
                    avoid_paths=avoid_paths,
                    avoid_names=avoid_names,
                    indent_level=indent_level + 1,
                    content=content)
            else:
                print(f"{indent}[FILE] {entry.name}")
                if content:
                    print("---------")
                    try:
                        with open(entry.path, 'r', encoding='utf-8') as file:
                            print(f"{file.read()}")
                    except Exception as e:
                        print(f"Error reading file {entry.name}: {e}")
                    print("")

# Paths and names to avoid
avoid_paths = [
    'src'
    '.angular',
    '.vscode',
    'node_modules',
    'public',
    '.editorconfig',
    '.gitignore',
    'file_tree_viewer.py',
    'package-lock.json',
    'README.md',
    'src/favicon.ico'
    'file_tree_viewer_result.txt'
]

avoid_names = [
    '.css',
    '.angular',
    'assets',
    'favicon',
]


# Convert relative paths to absolute paths
avoid_paths = [os.path.join(os.getcwd(), r) for r in avoid_paths]
for i, path in enumerate(avoid_paths):
    avoid_paths[i] = path.replace('\\', os.sep)
    avoid_paths[i] = path.replace('/', os.sep)
    
display_tree(
    os.getcwd(),
    avoid_paths=avoid_paths,
    avoid_names=avoid_names,
    indent_level=0,
    content=True
)

# Run the script and save the output to a file
# python .\p.py > file_tree_viewer_result.txt
# and copying the content of the file_tree_viewer_result.txt file to the clipboard and pasting to an AI tools
