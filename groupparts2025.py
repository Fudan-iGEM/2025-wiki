import os
# mkdir parts-json

# pip3 install scrapy
from time import sleep
import json as py_json

only_local = False
force_check_rfc = False
force_check_used = False

white_listed = ['BBa_B0030',
'BBa_I742151',
'BBa_J18920',
'BBa_J61100',
'BBa_K1151001',
'BBa_K118002',
'BBa_K118003',
'BBa_K118008',
'BBa_K2150031',
'BBa_K2306003',
'BBa_K3457006',
'BBa_K3648010',
'BBa_K4162003',
'BBa_K4162004',
'BBa_K4162005',
'BBa_K4162006',
'BBa_K4162010',
'BBa_K4162013',
'BBa_K4162016',
'BBa_K4162019',
'BBa_K4765020',
'BBa_K4765021',
'BBa_K4765111',
'BBa_K4655016',
'BBa_K4767017' ] # before 2024
white_listed += ['BBa_K5115058', 'BBa_K5115059', 'BBa_K5115086', 'BBa_K5115087' ] # fusion proteins from Fudan 2024
z = white_listed + ['BBa_K4162001', 'BBa_K4162009', 'BBa_K4162010', 'BBa_K4162011', 'BBa_K4162012',
 'BBa_K4162013', 'BBa_K4162014', 'BBa_K4162016', 'BBa_K4162019', 'BBa_K4162021', 'BBa_K4765022',
 'BBa_K4765117', 'BBa_K4765126' ] # testing software tool
z = sorted( list(set(z)) )
z += ['BBa_25Y6BTXZ', 'BBa_25ATGCHY', 'BBa_25TEB42Q', 'BBa_25Q67BOD', 'BBa_255A36IQ', 'BBa_25TMD7MC', 'BBa_25O0GI56', 'BBa_25U88LU3', 'BBa_2533RATE', 'BBa_25CLCLXX',
      'BBa_251T359T', 'BBa_259DU8YN', 'BBa_252BO17G', 'BBa_251I2TLJ', 'BBa_25IK0L52', 'BBa_2599SI53', 'BBa_25M2Z9H7', 'BBa_25GARG3E', 'BBa_25F6RD26', 'BBa_25IB5O7X',
      'BBa_25TYRLM9', 'BBa_25YPQSK9', 'BBa_25OM7KR0', 'BBa_25RDFDUP', 'BBa_25PI44VT', 'BBa_25S9WAFG', 'BBa_25AIDL8P', 'BBa_25TQG9WZ', 'BBa_25VHXKNL', 'BBa_25MK00H6',
      'BBa_250R9OVR', 'BBa_25TBH6RS', 'BBa_25QW6S8M' ]
# XXXXYYY no longer used by registry.igem.org z += range(0, 10)
subparts = []
sub_is_NOT_basic = []
basic_parts = []
parts_not_published = []
known_basic_parts = ['BBa_B0030',
'BBa_I742151',
'BBa_J18920',
'BBa_J61100',
'BBa_K1151001',
'BBa_K118002',
'BBa_K118003',
'BBa_K118008',
'BBa_K2150031',
'BBa_K2306003',
'BBa_K3457006',
'BBa_K3648010',
'BBa_K4162001',
'BBa_K4162003',
'BBa_K4162004',
'BBa_K4162005',
'BBa_K4162006',
'BBa_K4765015',
'BBa_K4765016',
'BBa_K4765020',
'BBa_K4765021',
'BBa_K4765022',
'BBa_K5115000',
'BBa_K5115001',
'BBa_K5115002',
'BBa_K5115003',
'BBa_K5115004',
'BBa_K5115005',
'BBa_K5115006',
'BBa_K5115007',
'BBa_K5115008',
'BBa_K5115009',
'BBa_K5115010',
'BBa_K5115021',
'BBa_K5115022',
'BBa_K5115023',
'BBa_K5115024',
'BBa_K5115025',
'BBa_K5115026',
'BBa_K5115027',
'BBa_K5115028',
'BBa_K5115029',
'BBa_K5115030',
'BBa_K5115031',
'BBa_K5115032',
'BBa_K5115044',
'BBa_K5115045',
'BBa_K5115046',
'BBa_K5115047',
'BBa_K5115048',
'BBa_K5115049',
'BBa_K5115050',
'BBa_K5115054',
'BBa_K5115055',
'BBa_K5115069',
'BBa_K5115070',
'BBa_K5115071',
'BBa_K5115072',
'BBa_K5115073',
'BBa_K5115074',
'BBa_K5115075',
'BBa_K5115076',
'BBa_K5115083',
'BBa_K5115084',
'BBa_K5115085',
'BBa_K5115088',
'BBa_K5115089' ]


table_th = ('Part Name', 'Short Description', 'Part Type', 'Designer(s)')
fff = open('groupparts.md', 'w')
fff.write('| |Slug |Part Name |Description |Part Type |Length |Modified at |Compatible |Used in |\n')
fff.write('|----|----|----|----|----|----|----|----|----|\n')

for zz in z:
    if str(zz).startswith('BBa_'):
        part_name = zz
    else:
        part_name = 'BBa_K5643%s' % str(zz).zfill(3) # Team Fudan iGEM 2025
    if os.path.isfile('parts-json/%s_slug.json' % part_name):
        print('load:\t', part_name)
    elif not only_local:
        print('fetch:\t', part_name)
        if part_name.startswith('BBa_K'): # new in 2025, slug
            #driver.get("https://registry.igem.org/parts/bba-k%s" % part_name[5:] )
            os.system('scrapy fetch --nolog "https://api.registry.igem.org/v1/parts/slugs/bba-k%s" > parts-json/%s_slug.json' % (
                       part_name[5:],
                       part_name ))
        else:
            os.system('scrapy fetch --nolog "https://api.registry.igem.org/v1/parts/slugs/%s" > parts-json/%s_slug.json' % (
                       part_name.lower().replace('_', '-'),
                       part_name ))
        if not only_local:
            sleep(2)
        # page = driver.page_source
        # if page:
        #     f = open('' % part_name, 'w')
        #     f.write(driver.page_source)
        #     f.close()
    try:
        ff = open('parts-json/%s_slug.json' % part_name, 'r')
    except Exception as e:
        if not only_local:
            print('!!\n\n   %s' % e)
        continue
    page = ff.read()
    ff.close()
    try:
        p2 = py_json.loads(page)
        if p2.get('error'):
            print('!! %s' % p2['error'])
            os.system('rm parts-json/%s_slug.json' % part_name)
            continue
        # {
        #   "uuid": "3e30ad4f-5360-49f7-bda4-60929b0f2971",
        #   "name": "BBa_B0030",
        #   "slug": "bba-b0030",
        #   "status": "published",
        #   "title": "RBS.1 (strong) -- modified from R. Weiss",
        #   "description": "Strong RBS based on Ron Weiss thesis. Strength is considered relative to \u003Cbb_part\u003EBBa_B0031\u003C/bb_part\u003E, \u003Cbb_part\u003EBBa_B0032\u003C/bb_part\u003E, \u003Cbb_part\u003EBBa_B0033\u003C/bb_part\u003E.\\n",
        #   "type": {
        #     "uuid": "9136e5fb-7232-4992-b828-d4fa4889ce63",
        #     "label": "RBS",
        #     "slug": "rbs"
        #   },
        #   "licenseUUID": "d6c69ca7-8be4-4bc0-b4a8-d3ae1d428aa6",
        #   "source": "",
        #   "sequence": "ATTAAAGAGGAGAAA",
        #   "audit": {
        #     "created": "2003-01-31T00:00:00.000Z",
        #     "updated": "2021-09-08T20:22:43.000Z"
        #   }
        # }
    except Exception as e:
        print('!! %s' % e)
        continue
    favorited = ''
    if p2['status'] != 'published':
        parts_not_published.append(part_name)
        print('-- %s blocked for doc, due to "%s"' % (part_name, p2['status']))
    fff.write('|%s |%s |%s |%s |%s |%s |%s |' % (part_name,
                    p2['uuid'],
                    p2['title'],
                    p2['description'].replace('\n', '    ').replace('\r', '    '), # <br>
                    p2['type']['label'],
                    len(p2['sequence']),
                    p2['audit']['updated'] ))
    # https://api.registry.igem.org/v1/parts/3e30ad4f-5360-49f7-bda4-60929b0f2971/compatibilities
    # https://api.registry.igem.org/v1/parts/3e30ad4f-5360-49f7-bda4-60929b0f2971/uses
    if force_check_rfc or not os.path.isfile('parts-json/%s_rfc.json' % part_name):
        os.system('scrapy fetch --nolog "https://api.registry.igem.org/v1/parts/%s/compatibilities" > parts-json/%s_rfc.json' % (
                  p2['uuid'], part_name ))
    # {"rfc10":{"compatible":true,"motif":null,"index":null},"rfc1000":{"compatible":false,"motif":"GGTCTC","index":178}}
    if force_check_used or not os.path.isfile('parts-json/%s_used.txt' % part_name):
        os.system('scrapy fetch --nolog "https://api.registry.igem.org/v1/parts/%s/uses" > parts-json/%s_used.txt' % (
                  p2['uuid'], part_name ))
    ff = open('parts-json/%s_rfc.json' % part_name, 'r')
    p3 = py_json.loads( ff.read() )
    ff.close()
    if p3['rfc10']['compatible']:
        fff.write('RFC10 ')
    if p3['rfc1000']['compatible']:
        fff.write('RFC1000 ')
    ff = open('parts-json/%s_used.txt' % part_name, 'r')
    fff.write('|%s |\n' % ff.read().strip() )
    ff.close()
    if not only_local:
        sleep(2)
    # https://api.registry.igem.org/v1/parts/3e30ad4f-5360-49f7-bda4-60929b0f2971/is-composite
    # https://api.registry.igem.org/v1/parts/49ca5c96-e5c4-48ac-850b-3271e6b188eb/is-composite
    print('-- cannot extract subparts at this moment')
#driver.quit() # end of zz in z


# fff.write('\n\n| | | Old Part | Description | Type | Not 2024 | Length | Compatible | |\n')
# fff.write('|----|----|----|----|----|----|----|----|----|\n')
fff.close()

# print('\n\n====\nBelow are subparts in composite parts:\n')
# print('\n'.join(["'%s'," % x for x in sorted(subparts) ]))

# print('\n====\nBelow are basic parts:\n')
# print('\n'.join(["'%s'," % x for x in sorted(basic_parts) ]))

# print('\n====\nSubparts are Not basic, and not white listed:\n')
# print('\n'.join(["'%s'," % x for x in sorted(sub_is_NOT_basic) ]))

if parts_not_published:
    print('\n\n====\nBelow are parts block for doc:\n')
    print('\n'.join(["'%s'," % x for x in sorted(parts_not_published) ]))

print('\n\nCAUTION: remove files in parts-json for update\n')
#print('Validate with https://parts.igem.org/partsdb/search_1000.cgi?q=K5115000\n\n\n\n')
