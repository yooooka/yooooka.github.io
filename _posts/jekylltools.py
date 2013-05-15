#!/usr/bin/env python
import yaml


class JDoc:
    def __repr__(self):
        return "JDoc(filename=%r, data=%r, content=%r)" \
            % (self.filename, self.data, self.content)

    def __init__(self, filename):
        self.filename = filename
        with open(filename) as f:
            doc = f.read().split('---\n')
            if len(doc) == 3:
                self.data = yaml.load(doc[1])
                self.content = doc[2]
            else:
                self.data = {}
                self.content = doc[0]

    def dump(self):
        out = '---\n'
        out += yaml.dump(self.data, default_flow_style=False)
        out += '---\n'
        out += self.content
        return out

    def save(self):
        with open(self.filename, 'w') as f:
            f.write(self.dump())
