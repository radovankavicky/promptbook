import { prettifyPromptbookString } from '../conversion/prettify/prettifyPromptbookString';
import { parseNumber } from '../conversion/utils/parseNumber';
import { assertsExecutionSuccessful } from '../execution/assertsExecutionSuccessful';
import { checkExpectations, isPassingExpectations } from '../execution/utils/checkExpectations';
import { replaceParameters } from '../execution/utils/replaceParameters';
import { executionReportJsonToString } from '../types/execution-report/executionReportJsonToString';
import {
    ExecutionReportStringOptions,
    ExecutionReportStringOptionsDefaults,
} from '../types/execution-report/ExecutionReportStringOptions';
import { CountUtils } from '../utils/expectation-counters';
import { countCharacters } from '../utils/expectation-counters/countCharacters';
import { countLines } from '../utils/expectation-counters/countLines';
import { countPages } from '../utils/expectation-counters/countPages';
import { countParagraphs } from '../utils/expectation-counters/countParagraphs';
import { countSentences, splitIntoSentences } from '../utils/expectation-counters/countSentences';
import { countWords } from '../utils/expectation-counters/countWords';
import { isValidJsonString } from '../utils/isValidJsonString';
import { extractAllBlocksFromMarkdown } from '../utils/markdown/extractAllBlocksFromMarkdown';
import { extractAllListItemsFromMarkdown } from '../utils/markdown/extractAllListItemsFromMarkdown';
import { extractOneBlockFromMarkdown } from '../utils/markdown/extractOneBlockFromMarkdown';
import { removeContentComments } from '../utils/markdown/removeContentComments';
import { removeMarkdownFormatting } from '../utils/markdown/removeMarkdownFormatting';
import { capitalize } from '../utils/normalization/capitalize';
import { decapitalize } from '../utils/normalization/decapitalize';
import { DIACRITIC_VARIANTS_LETTERS } from '../utils/normalization/DIACRITIC_VARIANTS_LETTERS';
import { IKeywords, string_keyword } from '../utils/normalization/IKeywords';
import { isValidKeyword } from '../utils/normalization/isValidKeyword';
import { nameToUriPart } from '../utils/normalization/nameToUriPart';
import { nameToUriParts } from '../utils/normalization/nameToUriParts';
import { normalizeToKebabCase } from '../utils/normalization/normalize-to-kebab-case';
import { normalizeTo_camelCase } from '../utils/normalization/normalizeTo_camelCase';
import { normalizeTo_PascalCase } from '../utils/normalization/normalizeTo_PascalCase';
import { normalizeTo_SCREAMING_CASE } from '../utils/normalization/normalizeTo_SCREAMING_CASE';
import { normalizeTo_snake_case } from '../utils/normalization/normalizeTo_snake_case';
import { normalizeWhitespaces } from '../utils/normalization/normalizeWhitespaces';
import { parseKeywords } from '../utils/normalization/parseKeywords';
import { parseKeywordsFromString } from '../utils/normalization/parseKeywordsFromString';
import { removeDiacritics } from '../utils/normalization/removeDiacritics';
import { searchKeywords } from '../utils/normalization/searchKeywords';
import { extractBlock } from '../utils/postprocessing/extractBlock';
import { removeEmojis } from '../utils/removeEmojis';
import { removeQuotes } from '../utils/removeQuotes';
import { trimCodeBlock } from '../utils/trimCodeBlock';
import { trimEndOfCodeBlock } from '../utils/trimEndOfCodeBlock';
import { unwrapResult } from '../utils/unwrapResult';

// TODO: [🌻] For all, decide if theese are internal or external
export {
    assertsExecutionSuccessful,
    checkExpectations,
    executionReportJsonToString,
    ExecutionReportStringOptions,
    ExecutionReportStringOptionsDefaults,
    extractAllBlocksFromMarkdown, // <- [🌻]
    extractAllListItemsFromMarkdown,
    extractBlock, // <- [🌻]
    extractOneBlockFromMarkdown,
    isPassingExpectations,
    isValidJsonString,
    parseNumber, // <- [🌻]
    prettifyPromptbookString,
    removeContentComments,
    removeEmojis,
    removeMarkdownFormatting,
    removeQuotes,
    replaceParameters,
    trimCodeBlock,
    trimEndOfCodeBlock,
    unwrapResult,
};

export { countCharacters, countLines, countPages, countParagraphs, countSentences, CountUtils, countWords };

export { splitIntoSentences };

// And the normalization (originally n12 library) utilities:

export const normalizeTo = {
    camelCase: normalizeTo_camelCase,
    PascalCase: normalizeTo_PascalCase,
    'SCREAMING-CASE': normalizeTo_SCREAMING_CASE,
    snake_case: normalizeTo_snake_case,
    'kebab-case': normalizeToKebabCase,
};

export {
    capitalize,
    decapitalize,
    DIACRITIC_VARIANTS_LETTERS,
    IKeywords,
    isValidKeyword,
    nameToUriPart,
    nameToUriParts,
    normalizeTo_camelCase,
    normalizeTo_PascalCase,
    normalizeTo_SCREAMING_CASE,
    normalizeTo_snake_case,
    normalizeToKebabCase,
    normalizeWhitespaces,
    parseKeywords,
    parseKeywordsFromString,
    removeDiacritics,
    searchKeywords,
    string_keyword,
};

/**
 * TODO: [🧠] Maybe create some indipendent package like `markdown-tools` from both here exported and @private utilities
 */
