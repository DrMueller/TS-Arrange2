# IMPORTANT UPDATE: Feedback wanted

The current code uses a lot of string parsing. As the TypeScript API is evolving and would fit the need way better, I'm currently thinking of a rewrite.
As it's no fun to rewrite without benefit, please send me your ideas or pain points as issues on GitHub. The following ideas are already gathered:
- Consideration of comments
- Management of properties

# TS-Arrange2
A plugin for Typescript, which arranges elements within a class.

## Installation
On the extensions tab, search for *TS-Arrange2* and install it.

## Features
### Genal
This plugin arranges elements within a class by the following attributes attributes:
- Visibility
- Location (Static / Instance)
- Kind (Property, Field, Constructor)

### Sorting algorithm
- The sorting of the blocks is determinated by the TSLint rule __member-ordering__
- Within each element block, the members are ordered by their name
- Elements, which can't be associated, are set at the end of the class

## Limitations
The logic expects a member-ordering configuration with the exact declaration, for example:

```
"member-ordering": [
      true,
      {
        "order": [
          "public-static-field",
          "public-instance-field",
          "protected-static-field",
          "protected-instance-field",
          "private-static-field",
          "private-instance-field",
          "public-constructor",
          "protected-constructor",
          "private-constructor",
          "public-static-method",
          "public-instance-method",
          "protected-static-method",
          "protected-instance-method",
          "private-static-method",
          "private-instance-method"
        ]
      }
    ],
```

## Usage
### Shortcut
1. Navigate to the desired Typescript Class
1. Use __ctrl+shift+a__ to invoke the command

### Command Palette
1. Navigate to the desired Typescript Class
1. In the command palette(ctrl+shift+p), enter *Arrange File*

## Contributing
If you have any questions, fixes or enhancements, please create a pull request or an issue.
[Github](https://github.com/DrMueller/TS-Arrange2)

## History
Please see the changelog.

## License
This software is released under [MIT License](http://www.opensource.org/licenses/mit-license.php)
