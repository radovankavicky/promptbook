import { spaceTrim } from 'spacetrim';
import { PromptbookExecutionError } from '../../../../errors/PromptbookExecutionError';
import { CommonExecutionToolsOptions } from '../../../CommonExecutionToolsOptions';
import { ScriptExecutionTools, ScriptExecutionToolsExecuteOptions } from '../../../ScriptExecutionTools';

/**
 * ScriptExecutionTools for TypeScript
 *
 * Warning: This is not implemented yet
 */
export class TypescriptExecutionTools implements ScriptExecutionTools {
    public constructor(private readonly options: CommonExecutionToolsOptions) {}

    /**
     * Executes a TypeScript
     */
    public async execute(options: ScriptExecutionToolsExecuteOptions): Promise<string> {
        const { scriptLanguage, script } = options;

        if (scriptLanguage !== 'typescript') {
            throw new PromptbookExecutionError(
                `Script language ${scriptLanguage} not supported to be executed by TypescriptExecutionTools`,
            );
        }

        if (this.options.isVerbose) {
            console.info(
                spaceTrim(
                    (block) => `
                        🚀 NOT Evaluating ${scriptLanguage} script:

                        ${block(script)}`,
                ),
            );
        }

        throw new PromptbookExecutionError('Not implemented');
    }
}
