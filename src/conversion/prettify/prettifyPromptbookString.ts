import { normalizeTo_PascalCase } from 'n12';
import spaceTrim from 'spacetrim';
import { promptbookStringToJson } from '../../conversion/promptbookStringToJson';
import { UnexpectedError } from '../../errors/UnexpectedError';
import { PromptbookString } from '../../types/PromptbookString';
import { string_name } from '../../types/typeAliases';
import { addAutoGeneratedSection } from '../../utils/markdown/addAutoGeneratedSection';
import { prettifyMarkdown } from '../../utils/markdown/prettifyMarkdown';
import type { PrettifyOptions } from './PrettifyOptions';

/**
 * !!!
 */
export function prettifyPromptbookString(
    promptbookString: PromptbookString,
    options: PrettifyOptions,
): PromptbookString {
    const { isGraphAdded, isPrettifyed } = options;

    if (isGraphAdded) {
        const promptbookJson = promptbookStringToJson(promptbookString);

        const parameterNameToTemplateName = (parameterName: string_name) => {
            const parameter = promptbookJson.parameters.find((parameter) => parameter.name === parameterName);

            if (!parameter) {
                throw new UnexpectedError(`Could not find {${parameterName}}`);
            }

            if (parameter.isInput) {
                return 'input';
            }

            const template = promptbookJson.promptTemplates.find(
                (template) => template.resultingParameterName === parameterName,
            );

            if (!template) {
                throw new Error(`Could not find template for {${parameterName}}`);
            }

            return 'template' + normalizeTo_PascalCase(template.title);
        };

        const promptbookMermaid = spaceTrim(
            (block) => `

                %% 🔮 Tip: Open this on GitHub or in the VSCode website to see the Mermaid graph visually

                flowchart LR
                  subgraph "${promptbookJson.title}"

                      direction TB

                      input((Input)):::input
                      ${block(
                          promptbookJson.promptTemplates
                              .flatMap(({ title, dependentParameterNames, resultingParameterName }) => [
                                  `${parameterNameToTemplateName(resultingParameterName)}(${title})`,
                                  ...dependentParameterNames.map(
                                      (dependentParameterName) =>
                                          `${parameterNameToTemplateName(
                                              dependentParameterName,
                                          )}--"{${dependentParameterName}}"-->${parameterNameToTemplateName(
                                              resultingParameterName,
                                          )}`,
                                  ),
                              ])
                              .join('\n'),
                      )}

                      ${block(
                          promptbookJson.parameters
                              .filter(({ isOutput }) => isOutput)
                              .map(({ name }) => `${parameterNameToTemplateName(name)}--"{${name}}"-->output`)
                              .join('\n'),
                      )}
                      output((Output)):::output

                      classDef input color: grey;
                      classDef output color: grey;

                  end;



        `,
        );

        const promptbookMermaidBlock = spaceTrim(
            (block) => `
            \`\`\`mermaid
            ${block(promptbookMermaid)}
            \`\`\`
        `,
        );

        promptbookString = addAutoGeneratedSection(promptbookString, {
            sectionName: 'Graph',
            sectionContent: promptbookMermaidBlock,
        }) as PromptbookString;
    }

    if (isPrettifyed) {
        promptbookString = prettifyMarkdown(promptbookString) as PromptbookString;
    }

    return promptbookString;
}

/**
 * TODO: Maybe use some Mermaid library instead of string templating
 * TODO: [🧠] Should this be here OR in other folder
 * TODO: [🕌] When more than 2 functionalities, split into separate functions
 */
