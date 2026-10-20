import os
import re

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    def fix_import(match):
        quote = match.group(1)
        path = match.group(2)
        end_quote = match.group(3)
        
        if path.endswith(('.js', '.jsx', '.json', '.css', '.png', '.jpg', '.svg', '.gif')):
            target_dir = os.path.normpath(os.path.join(os.path.dirname(filepath), path))
            
            if os.path.exists(target_dir):
                actual_ext = None
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(target_dir + ext):
                        actual_ext = ext
                        break
                
                if actual_ext and not path.endswith(actual_ext):
                    base = os.path.splitext(path)[0]
                    return quote + base + actual_ext + end_quote
            elif os.path.isdir(target_dir):
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(os.path.join(target_dir, 'index' + ext)):
                        return quote + path + '/index' + ext + end_quote
        
        return match.group(0)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    def fix_import(match):
        quote = match.group(1)
        path = match.group(2)
        end_quote = match.group(3)
        
        if path.endswith(('.js', '.jsx', '.json', '.css', '.png', '.jpg', '.svg', '.gif')):
            target_dir = os.path.normpath(os.path.join(os.path.dirname(filepath), path))
            
            if os.path.exists(target_dir):
                actual_ext = None
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(target_dir + ext):
                        actual_ext = ext
                        break
                
                if actual_ext and not path.endswith(actual_ext):
                    base = os.path.splitext(path)[0]
                    return quote + base + actual_ext + end_quote
            elif os.path.isdir(target_dir):
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(os.path.join(target_dir, 'index' + ext)):
                        return quote + path + '/index' + ext + end_quote
        
        return match.group(0)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    def fix_import(match):
        quote = match.group(1)
        path = match.group(2)
        end_quote = match.group(3)
        
        if path.endswith(('.js', '.jsx', '.json', '.css', '.png', '.jpg', '.svg', '.gif')):
            target_dir = os.path.normpath(os.path.join(os.path.dirname(filepath), path))
            
            if os.path.exists(target_dir):
                actual_ext = None
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(target_dir + ext):
                        actual_ext = ext
                        break
                
                if actual_ext and not path.endswith(actual_ext):
                    base = os.path.splitext(path)[0]
                    return quote + base + actual_ext + end_quote
            elif os.path.isdir(target_dir):
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(os.path.join(target_dir, 'index' + ext)):
                        return quote + path + '/index' + ext + end_quote
        
        return match.group(0)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    def fix_import(match):
        quote = match.group(1)
        path = match.group(2)
        end_quote = match.group(3)
        
        if path.endswith(('.js', '.jsx', '.json', '.css', '.png', '.jpg', '.svg', '.gif')):
            target_dir = os.path.normpath(os.path.join(os.path.dirname(filepath), path))
            
            if os.path.exists(target_dir):
                actual_ext = None
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(target_dir + ext):
                        actual_ext = ext
                        break
                
                if actual_ext and not path.endswith(actual_ext):
                    base = os.path.splitext(path)[0]
                    return quote + base + actual_ext + end_quote
            elif os.path.isdir(target_dir):
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(os.path.join(target_dir, 'index' + ext)):
                        return quote + path + '/index' + ext + end_quote
        
        return match.group(0)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    content = re.sub(r"(from\s+['\"])(\.[^'\"]+)(['\"])", fix_import, content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed imports in {filepath}")
    else:
        print(f"No changes needed in {filepath}")

import os
import re

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            original = content
            
            def fix_import(match):
                quote = match.group(1)
                path = match.group(2)
                end_quote = match.group(3)
                
                if path.endswith(('.js', '.jsx', '.json', '.css', '.png', '.jpg', '.svg', '.gif')):
                    target_dir = os.path.normpath(os.path.join(os.path.dirname(filepath), path))
                    
                    if os.path.exists(target_dir):
                        actual_ext = None
                        for ext in ['.jsx', '.js', '.json']:
                            if os.path.exists(target_dir + ext):
                                actual_ext = ext
                                break
                
                if actual_ext and not path.endswith(actual_ext):
                    base = os.path.splitext(path)[0]
                    return quote + base + actual_ext + end_quote
            elif os.path.isdir(target_dir):
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(os.path.join(target_dir, 'index' + ext)):
                        return quote + path + '/index' + ext + end_quote
        
        return match.group(0)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    def fix_import(match):
        quote = match.group(1)
        path = match.group(2)
        end_quote = match.group(3)
        
        if path.endswith(('.js', '.jsx', '.json', '.css', '.png', '.jpg', '.svg', '.gif')):
            target_dir = os.path.normpath(os.path.join(os.path.dirname(filepath), path))
            
            if os.path.exists(target_dir):
                actual_ext = None
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(target_dir + ext):
                        actual_ext = ext
                        break
                
                if actual_ext and not path.endswith(actual_ext):
                    base = os.path.splitext(path)[0]
                    return quote + base + actual_ext + end_quote
            elif os.path.isdir(target_dir):
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(os.path.join(target_dir, 'index' + ext)):
                        return quote + path + '/index' + ext + end_quote
        
        return match.group(0)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    content = re.sub(r"(from\s+['\"])(\.[^'\"]+)(['\"])", fix_import, content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed imports in {filepath}")
    else:
        print(f"No changes needed in {filepath}")

import os
import re

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            original = content
            
            def fix_import(match):
                quote = match.group(1)
                path = match.group(2)
                end_quote = match.group(3)
                
                if path.endswith(('.js', '.jsx', '.json', '.css', '.png', '.jpg', '.svg', '.gif')):
                    target_dir = os.path.normpath(os.path.join(os.path.dirname(filepath), path))
                    
                    if os.path.exists(target_dir):
                        actual_ext = None
                        for ext in ['.jsx', '.js', '.json']:
                            if os.path.exists(target_dir + ext):
                                actual_ext = ext
                                break
                
                if actual_ext and not path.endswith(actual_ext):
                    base = os.path.splitext(path)[0]
                    return quote + base + actual_ext + end_quote
            elif os.path.isdir(target_dir):
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(os.path.join(target_dir, 'index' + ext)):
                        return quote + path + '/index' + ext + end_quote
        
        return match.group(0)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    content = re.sub(r"(from\s+['\"])(\.[^'\"]+)(['\"])", fix_import, content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed imports in {filepath}")
    else:
        print(f"No changes needed in {filepath}")

import os
import re

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r') as f:
                content = f.read()
            
            original = content
            
            def fix_import(match):
                quote = match.group(1)
                path = match.group(2)
                end_quote = match.group(3)
                
                if path.endswith(('.js', '.jsx', '.json', '.css', '.png', '.jpg', '.svg', '.gif')):
                    target_dir = os.path.normpath(os.path.join(os.path.dirname(filepath), path))
                    
                    if os.path.exists(target_dir):
                        actual_ext = None
                        for ext in ['.jsx', '.js', '.json']:
                            if os.path.exists(target_dir + ext):
                                actual_ext = ext
                                break
                
                if actual_ext and not path.endswith(actual_ext):
                    base = os.path.splitext(path)[0]
                    return quote + base + actual_ext + end_quote
            elif os.path.isdir(target_dir):
                for ext in ['.jsx', '.js', '.json']:
                    if os.path.exists(os.path.join(target_dir, 'index' + ext)):
                        return quote + path + '/index' + ext + end_quote
        
        return match.group(0)
    
    with open(filepath, 'r') as f:
        content = f.read()
    
    original = content
    
    content = re.sub(r"(from\s+['\"])(\.[^'\"]+)(['\"])", fix_import, content)
    
    if content != original:
        with open(filepath, 'w') as f:
            f.write(content)
        print(f"Fixed imports in {filepath}")
    else:
        print(f"No changes needed in {filepath}")

import os
import re

for root, dirs, files in os.walk('src'):
    for file in files:
        if file.endswith('.js') or file.endswith('.jsx'):
            filepath = os.path.join(root, file)
            fix_file(filepath)

print("Done fixing imports")
