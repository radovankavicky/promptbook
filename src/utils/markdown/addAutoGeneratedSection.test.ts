import { describe, expect, it } from '@jest/globals';
import spaceTrim from 'spacetrim';
import { just } from '../just';
import { addAutoGeneratedSection } from './addAutoGeneratedSection';

describe('how addAutoGeneratedSection works', () => {
    it('should add the section', () => {
        expect(
            addAutoGeneratedSection(
                spaceTrim(`
                    # Foo

                    Blah blah blah

                    - Bar
                    - Baz

                    ## Heading 2

                    Blah blah blah

                `),
                {
                    sectionName: 'Graph',
                    sectionContent: 'Bar\nBaz\nFoo',
                },
            ),
        ).toBe(
            just(
                spaceTrim(`
                    # Foo

                    Blah blah blah

                    - Bar
                    - Baz

                    <!--Graph-->
                    <!--⚠️WARNING: This section was auto-generated-->
                    Bar
                    Baz
                    Foo
                    <!--/Graph-->

                    ## Heading 2

                    Blah blah blah
                `),
            ),
        );
    });

    it('should modify the section', () => {
        expect(
            addAutoGeneratedSection(
                spaceTrim(`
                    # Foo

                    Blah blah blah

                    - Bar
                    - Baz

                    <!--Graph-->
                    <!--⚠️WARNING: This section was auto-generated-->
                    Bar
                    Baz
                    Foo
                    <!--/Graph-->

                    ## Heading 2

                    Blah blah blah

                `),
                {
                    sectionName: 'Graph',
                    sectionContent: 'Brrrr',
                },
            ),
        ).toBe(
            just(
                spaceTrim(`
                  # Foo

                  Blah blah blah

                  - Bar
                  - Baz

                  <!--Graph-->
                  <!--⚠️ WARNING: This section was auto-generated-->
                  Brrrr
                  <!--/Graph-->

                  ## Heading 2

                  Blah blah blah
              `),
            ),
        );
    });
});
