# CSV_file_filter
General purpose filter that parses through a given ```.csv``` file and filters out whatever doesnt match the given criteria.


What gets filtered can be configured in the ```filters.js``` file.


Current example will:
- Look for a header named "Country" and only keep a row in the csv if it is a european country.
- Look for a header named "User Email" and only keep rows that have a valid email address.
- Look for a header named "User Industry Field" and reject any rows that are Students.

A new ```.csv``` file is downloaded containing only the remaining values.