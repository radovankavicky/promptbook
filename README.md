# 🌠 Prompt template pipelines

Library to supercharge your use of large language models

<!--Badges-->
<!--⚠️WARNING: This section was generated by https://github.com/hejny/batch-project-editor/blob/main/src/workflows/800-badges/badges.ts so every manual change will be overwritten.-->

[![License of 🌠 Prompt template pipelines](https://img.shields.io/github/license/hejny/ptp.svg?style=flat)](https://github.com/hejny/ptp/blob/main/LICENSE)
[![NPM Version of 🌠 Prompt template pipelines](https://badge.fury.io/js/ptp.svg)](https://www.npmjs.com/package/ptp)
[![Quality of package 🌠 Prompt template pipelines](https://packagequality.com/shield/ptp.svg)](https://packagequality.com/#?package=ptp)
[![Known Vulnerabilities](https://snyk.io/test/github/hejny/ptp/badge.svg)](https://snyk.io/test/github/hejny/ptp)
[![Issues](https://img.shields.io/github/issues/hejny/ptp.svg?style=flat)](https://github.com/hejny/ptp/issues)

<!--[![License of 🌠 Prompt template pipelines](https://img.shields.io/github/license/hejny/ptp.svg?style=flat)](https://github.com/hejny/ptp/blob/main/LICENSE)-->

<!--/Badges-->

## Concept

When you have a simple single prompt in GPT / ChatGPT, it doesn't matter how it is integrated, whether it's direct calling of Rest API or using Open Ai library and hardcoding prompt in source code or importing text file.

If you need something more advanced or want to extend the capabilities of LLMs, you generally have 3 ways to come:

1. **Fine-tune** the model to your perfection or even train your own.
2. **Tune** the prompt to your perfection
3. Use **multishot** approach with multiple prompts to get the best result

In any of these situations, this library can make your life easier:

-   **Separation of concerns** between prompt engineer and programmer; between code files and prompt files; and between prompts, templates, templating pipelines, and their execution logic.
-   Set up a **common format** for prompts that is interchangeable between project and language/technology stacks.
-   Simplify your code to be **DRY** and not repeat all the boilerplate code for each prompt.
-   **Versioning** of prompt template pipelines
-   **Reuse** parts of prompt template pipelines in/between projects
-   **Logging** the results of the prompt template pipelines
-   **Caching** calls to LLMs to save money and time
-   **A/B testing** to determine which prompt works best for the job
-   Leverage the **streaming** to make super cool UI/UX

## Prompt template pipelines _(for prompt-engeneers)_

<!-- TODO: !!! Write paragraph about -->
<!-- TODO: [🧠] !!! Make some more clear escaping -->

<!------------------------[ Sample: ]------------------------>

```markdown
# Sample: Language Capabilities

Trying the language capabilities of GPT models.

-   PTP version 1.0.0
-   Use Chat
-   Use GPT-3.5
-   Input parameter `{word}` The word to use in the prompt.
-   Output parameter `{comparisonOfTwoSentences}` Comparison between two sentences
-   Output parameter `{summary}` The overall summary of the comparison

## Synonym

Synonym for word

\`\`\`
Write synonym for "{word}"
\`\`\`

`-> {wordSynonymRaw}`

## Unquote synonym

-   Execute script

\`\`\`javascript
removeQuotes(wordSynonymRaw);
\`\`\`

`-> {wordSynonym}` Synonym for word

## Sentence with Synonym

Sentence with word and wordSynonym

\`\`\`
Write sentence with "{word}" and "{wordSynonym}" in it
\`\`\`

`-> {sentenceWithTwoSynonyms}` Sentence with word and wordSynonym

## Sentence without original word

Sentence "{sentenceWithTwoSynonyms}" without "{word}".

\`\`\`
Remove word "{word}" from sentence and modify it so that it makes sense:

## Rules:

-   Sentence must be grammatically correct
-   Sentence must make sense after removing the word

## The Sentence:

> {sentenceWithTwoSynonyms}

\`\`\`

`-> {sentenceWithOriginalWordRemoved}` Sentence with both synomyms but without a original word

## Comparison

Comparison between "{sentenceWithTwoSynonyms}" and "{sentenceWithOriginalWordRemoved}".

-   Use Chat
-   Use GPT-4

\`\`\`
Compare meaning of thee two sentences:

## Sentence 1:

> {sentenceWithTwoSynonyms}

## Sentence 2:

> {sentenceWithOriginalWordRemoved}

\`\`\`

`-> {comparisonOfTwoSentences}` Comparison between two sentences

## Summary

-   Execute simple template

\`\`\`markdown
You have entered a word **{word}**. For this word the best synonym is **{wordSynonym}**. The sentence with both words is **{sentenceWithTwoSynonyms}**. The sentence without the original word is **{sentenceWithOriginalWordRemoved}**. And the comparison between the two sentences is:

> {comparisonOfTwoSentences}

\`\`\`

`-> {summary}`
```

<!------------------------[ /Sample ]------------------------>

## Dictionary

The following glossary is used to clarify certain basic concepts:

### Prompt

Prompt in a text along with model requirements, but without any execution or templating logic.

For example:

```json
{
    "request": "Which sound does a cat make?",
    "modelRequirements": {
        "variant": "CHAT"
    }
}
```

```json
{
    "request": "I am a cat.\nI like to eat fish.\nI like to sleep.\nI like to play with a ball.\nI l",
    "modelRequirements": {
        "variant": "COMPLETION"
    }
}
```

### Prompt Template

Similar concept to Prompt, but with templating logic.

For example:

```json
{
    "request": "Which sound does a {animalName} make?",
    "modelRequirements": {
        "variant": "CHAT"
    }
}
```

### Model Requirements

Abstract way to specify the LLM.
It does not specify the LLM with concrete version itself, only the requirements for the LLM.
_NOT chatgpt-3.5-turbo BUT CHAT variant of GPT-3.5._

For example:

```json
{
    "variant": "CHAT",
    "version": "GPT-3.5",
    "temperature": 0.7
}
```

### Execution type

Each block of prompt template pipeline can have a different execution type.
It is specified in list of requirements for the block.
By default, it is `Prompt template`

-   _(default)_ `Prompt template` The block is a prompt template and is executed by LLM (OpenAI, Azure,...)
-   `Simple template` The block is a simple text template which is just filled with parameters
-   `Script` The block is a script that is executed by some script runtime, the runtime is determined by block type, currently only `javascript` is supported but we plan to add `python` and `typescript` in the future.
-   `Prompt dialog` Ask user for input

### Prompt Template Parameters

Parameters that are placed in the prompt template and replaced to create the prompt.
It is a simple key-value object.

```json
{
    "animalName": "cat",
    "animalSound": "Meow!"
}
```

There are three types of template parameters, depending on how they are used in the prompt template pipeline:

-   **Input parameters** are required to execute the prompt template pipeline.
-   **Intermediate parameters** are used internally in the prompt template pipeline.
-   **Output parameters** are not used internally in the prompt template pipeline, but are returned as the result of the prompt template pipeline execution.

### Prompt Template Pipeline

Prompt template pipeline is the **core concept of this library**.
It represents a series of prompt templates chained together to form a pipeline / one big prompt template with input and result parameters.

Internally it can have 3 formats:

-   **.ptp.md file** in custom markdown format described above
-   _(internal)_ **JSON** format, parsed from the .ptp.md file
-   _(internal)_ **Object** which is created from JSON format and bound with tools around (but not the execution logic)

### Prompt Template Pipeline **Library**

Library of prompt template pipelines that groups together prompt template pipelines for an application.
This is a very thin wrapper around the Array / Set of prompt template pipelines.

Prompt Template Pipeline library is a useful helper in execution, it can be shared between execution and consumer parts of the app and make common knowledge about prompt template pipelines.

It allows to create executor functions from prompt template pipelines in the library.

### Prompt Result

Prompt result is the simplest concept of execution.
It is the result of executing one prompt _(NOT a template)_.

For example:

```json
{
    "response": "Meow!",
    "model": "chatgpt-3.5-turbo"
}
```

### Execution Tools

`ExecutionTools` is an interface which contains all the tools needed to execute prompts (template pipelines).
It contais 3 subtools:

-   `NaturalExecutionTools`
-   `ScriptExecutionTools`
-   `UserInterfaceTools`

Which are described below:

#### Natural Execution Tools

`NaturalExecutionTools` is a container for all the tools needed to execute prompts to large language models like GPT-4.
On its interface it exposes common methods for prompt execution.
Internally it calls OpenAI, Azure, GPU, proxy, cache, logging,...

`NaturalExecutionTools` an abstract interface that is implemented by concrete execution tools:

-   `OpenAiExecutionTools`
-   _(Not implemented yet)_ `AzureOpenAiExecutionTools`
-   _(Not implemented yet)_ `BardExecutionTools`
-   _(Not implemented yet)_ `LamaExecutionTools`
-   _(Not implemented yet)_ `GpuExecutionTools`
-   And a special case are `RemoteNaturalExecutionTools` that connect to a remote server and run one of the above execution tools on that server.
-   The second special case is `MockedEchoNaturalExecutionTools` that is used for testing and mocking.
-   The third special case is `LogNaturalExecutionToolsWrapper` that is technically also an execution tools but it is more proxy wrapper around other execution tools that logs all calls to execution tools.

#### Script Execution Tools

`ScriptExecutionTools` is an abstract container that represents all the tools needed to execute scripts. It is implemented by concrete execution tools:

-   `JavascriptExecutionTools` is a wrapper around `vm2` module that executes javascript code in a sandbox.
-   `JavascriptEvalExecutionTools` is wrapper around `eval` function that executes javascript. It is used for testing and mocking **NOT intended to use in the production** due to its unsafe nature, use `JavascriptExecutionTools` instead.
-   _(Not implemented yet)_ `TypescriptExecutionTools` executes typescript code in a sandbox.
-   _(Not implemented yet)_ `PythonExecutionTools` executes python code in a sandbox.

#### User Interface Tools

`UserInterfaceTools` is an abstract container that represents all the tools needed to interact with the user. It is implemented by concrete execution tools:

-   _(Not implemented yet)_ `ConsoleInterfaceTools` is a wrapper around `readline` module that interacts with the user via console.
-   `SimplePromptInterfaceTools` is a wrapper around `window.prompt` synchronous function that interacts with the user via browser prompt. It is used for testing and mocking **NOT intended to use in the production** due to its synchronous nature.
-   `CallbackInterfaceTools` delagates the user interaction to a async callback function. You need to provide your own implementation of this callback function and its bind to UI. <!-- <- TODO: Provide here a way how to do it with some our plugin -->

### Executor

Executor is a simple async function that takes input parameters and returns output parameters _(along with all intermediate parameters and input parameters = it extends input object)_.

Executor is made by combining execution tools and prompt template pipeline library.
It can be done in two ways:

-   From `PromptTemplatePipelineLibrary.getExecutor` method
-   `createPtpExecutor` utility function

### Remote server

Remote server is a proxy server that uses its execution tools internally and exposes the executor interface externally.

You can simply use `RemoteExecutionTools` on client-side javascript and connect to your remote server.
This is useful to make all logic on browser side but not expose your API keys or no need to use customer's GPU.

## Usage and integration _(for developers)_

First you need to install this library:

```bash
npm install --save @gptp/core
```

_(TODO: Write this section)_

## FAQ

If you have a question [start a discussion](https://github.com/hejny/ptp/discussions/), [open an issue](https://github.com/hejny/ptp/issues) or [write me an email](https://www.pavolhejny.com/contact).

### Why not just use the OpenAI library?

Different levels of abstraction. OpenAI library is for direct use of OpenAI API. This library is for a higher level of abstraction. It is for creating prompt templates and prompt template pipelines that are independent of the underlying library, LLM model, or even LLM provider.

### How is it different from the Langchain library?

Langchain is primarily aimed at ML developers working in Python. This library is for developers working in javascript/typescript and creating applications for end users.

We are considering creating a bridge/converter between these two libraries.

<!--
Include:
- jde naprosto hlavně o python knihovnu a JavaScript je tam na druhém místě
- je zaměřený primárně na dělání templates ne na spojování templates do větších struktur
- na úrovni jazyka rozlišuje chat a completion, já potřebuji tyhle dvě věci mixovat do jedné template pipeline
- pro neprogramátora je docela těžké s takovou věcí pracovat a template psát- já bych měl mnohem radši systém který umožňuje psát šablony i pro netechnické lidi ( kterých je na trhu mnohem více než volných pythonistů)
- Focus mého projektu je primárně zaměřený na budování uživatelských aplikací, nepředgenerovávání, zpracování dat, tréning či autogpt.
-->

## TODOs

-   [ ] !! Make this working as external library
-   [ ] [🧠] Figure out the best name for this library - `Prompt Template Pipeline`, `Prompt Template Engine`, `Prompt Template Processor`, `Open Prompt Initiative`
-   [ ] Export all promptTemplatePipeline as ptp alias from library
-   [ ] Make from this folder a separate repository + npm package
-   [ ] Add tests
-   [ ] Annotate all entities
-   [ ] Make internal string aliases
-   [ ] Make branded types instead of pure `string` aliases
-   [ ] Remove all anys
-   [ ] Make PTP non-linear
-   [ ] Logging pipeline name, version, step,...
-   [ ] No circular dependencies
-   [ ][🧠] Wording: "param" vs "parameter" vs "variable" vs "argument"
-   [ ] All entities must have public / private / protected modifiers
-   [ ] Everything not needed should be private or not exported
-   [ ] Refactor circular dependencies
-   [ ] Importing subtemplates
-   [ ] Use spaceTrim more effectively
-   [ ] [🤹‍♂️] Allow chats to be continued with previous message
-   [ ] [🧠][🤹‍♂️] How to mark continued chat in .ptp.md format?
-   [ ] Use newest version of socket.io for remote server
-   [ ] [🧠] Allow to use and define [function calling](https://platform.openai.com/docs/guides/gpt/function-calling)
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx
-   [ ] xxx

```

```

<!--Contributing-->
<!--⚠️WARNING: This section was generated by https://github.com/hejny/batch-project-editor/blob/main/src/workflows/810-contributing/contributing.ts so every manual change will be overwritten.-->

## 🖋️ Contributing

I am open to pull requests, feedback, and suggestions. Or if you like this utility, you can [☕ buy me a coffee](https://www.buymeacoffee.com/hejny) or [donate via cryptocurrencies](https://github.com/hejny/hejny/blob/main/documents/crypto.md).

You can also ⭐ star the ptp package, [follow me on GitHub](https://github.com/hejny) or [various other social networks](https://www.pavolhejny.com/contact/).

<!--/Contributing-->

<!--Partners-->
<!--⚠️WARNING: This section was generated by https://github.com/hejny/batch-project-editor/blob/main/src/workflows/820-partners/partners.ts so every manual change will be overwritten.-->

## ✨ Partners

<a href="https://collboard.com/">
  <img src="https://collboard.fra1.cdn.digitaloceanspaces.com/assets/18.12.1/logo-small.png" alt="Collboard logo" width="50"  />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://czech.events/">
  <img src="https://czech.events/design/logos/czech.events.transparent-logo.png" alt="Czech.events logo" width="50"  />
</a>
&nbsp;&nbsp;&nbsp;
<a href="https://sigmastamp.ml/">
  <img src="https://www.sigmastamp.ml/sigmastamp-logo.white.svg" alt="SigmaStamp logo" width="50"  />
</a>

[Become a partner](https://www.pavolhejny.com/contact/)

<!--/Partners-->
