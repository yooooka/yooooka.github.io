#!/usr/bin/env python
import os
from jekylltools import JDoc

for fn in os.listdir('.'):
    if os.path.isfile(fn) and fn[-3:] == '.md':
        doc = JDoc(fn)
        doc.data.pop('permalink', None)
        doc.save()
