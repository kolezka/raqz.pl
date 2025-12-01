# Claude Code Configuration

This directory contains custom configurations for Claude Code, including specialized subagents designed to enhance development productivity and content management for the RaqZpl Solutions project.

## Custom Subagents

We have created 9 specialized subagents that provide expert assistance in different areas:

## Slash Commands (Quick Access)

For easier access, we've created slash commands that automatically invoke the right agent:

- `/review` - Code review with react-reviewer
- `/blog` - Create blog post with blog-writer
- `/translate` - Translate content with translator
- `/optimize` - Performance optimization with performance-optimizer
- `/test` - Generate tests with test-writer
- `/deps` - Dependency management with dependency-manager
- `/build` - Build optimization with build-optimizer
- `/commit` - Generate commit message with git-workflow
- `/refactor` - Code refactoring with refactoring-assistant

**Usage examples:**
```
/review HomePage.tsx
/blog about React Server Components
/translate the latest blog post to Polish
/optimize the blog listing page
/test the useBlogPosts hook
/deps
/commit
/refactor extract a custom hook from BlogListPage
```

These commands are defined in `.claude/commands/` and provide a convenient shortcut instead of typing the full Task tool invocation.

### Content Management Agents

#### 📝 Blog Writer (`blog-writer`)
Creates and validates MDX blog posts with proper frontmatter for our bilingual blog.

**Use when:**
- Creating new blog posts
- Validating blog post structure
- Generating SEO-optimized content
- Need help with MDX syntax

**Example usage:**
```
/Task with subagent_type='blog-writer' to create a new blog post about React performance optimization
```

**Capabilities:**
- Generate bilingual MDX content (English & Polish)
- Proper frontmatter structure and validation
- SEO optimization (titles, excerpts, meta descriptions)
- Category and tag recommendations
- Automatic blog index regeneration

#### 🌐 Translator (`translator`)
Provides accurate English ↔ Polish translation for blog posts and UI content.

**Use when:**
- Translating blog posts between languages
- Updating locale files (locales/en.json ↔ locales/pl.json)
- Ensuring translation consistency

**Example usage:**
```
/Task with subagent_type='translator' to translate the latest English blog post to Polish
```

**Capabilities:**
- MDX structure preservation
- Technical terminology handling
- Cultural adaptation for Polish audience
- Locale file translation
- Translation consistency validation

### Code Quality Agents

#### 🔍 React Reviewer (`react-reviewer`)
Specialized code review for React 19, TypeScript, and modern web patterns.

**Use when:**
- Reviewing new components or features
- Ensuring React best practices
- Checking accessibility compliance
- Validating TypeScript types

**Example usage:**
```
/Task with subagent_type='react-reviewer' to review the HomePage component
```

**Capabilities:**
- React 19 patterns and hooks validation
- TypeScript strict mode compliance
- Tailwind CSS best practices
- Accessibility (WCAG, ARIA) checks
- i18n usage validation
- Performance optimization suggestions

#### ♻️ Refactoring Assistant (`refactoring-assistant`)
Safe and effective code refactoring specialist.

**Use when:**
- Identifying code duplication
- Extracting components or hooks
- Simplifying complex logic
- Improving code organization

**Example usage:**
```
/Task with subagent_type='refactoring-assistant' to extract a custom hook from the BlogListPage component
```

**Capabilities:**
- Component extraction and composition
- Custom hook extraction
- DRY principle application
- Type refinement
- Performance pattern implementation
- Dead code elimination

### Performance & Build Agents

#### ⚡ Performance Optimizer (`performance-optimizer`)
Analyzes and optimizes React application performance.

**Use when:**
- Investigating performance issues
- Optimizing component rendering
- Reducing bundle size
- Improving Web Vitals scores

**Example usage:**
```
/Task with subagent_type='performance-optimizer' to analyze the blog listing page performance
```

**Capabilities:**
- Component render performance analysis
- Bundle size optimization
- Animation performance review
- Hook optimization (useMemo, useCallback)
- Lazy loading strategies
- Web Vitals monitoring

#### 🏗️ Build Optimizer (`build-optimizer`)
Optimizes Vite build configuration and output.

**Use when:**
- Optimizing production builds
- Analyzing bundle sizes
- Improving code splitting
- Configuring build settings

**Example usage:**
```
/Task with subagent_type='build-optimizer' to optimize the Vite configuration and reduce bundle size
```

**Capabilities:**
- Vite configuration optimization
- Code splitting strategies
- Tailwind CSS optimization
- Asset optimization
- Build performance tuning
- Bundle analysis

### Development Process Agents

#### 📦 Dependency Manager (`dependency-manager`)
Manages npm dependencies, updates, and security.

**Use when:**
- Checking for outdated packages
- Addressing security vulnerabilities
- Evaluating new dependencies
- Planning dependency updates

**Example usage:**
```
/Task with subagent_type='dependency-manager' to check for outdated packages and security issues
```

**Capabilities:**
- Dependency auditing (npm outdated, npm audit)
- Security vulnerability assessment
- Compatibility analysis (React 19, Vite 7)
- Bundle size impact analysis
- Update strategy recommendations
- Breaking change identification

#### 🔀 Git Workflow (`git-workflow`)
Assists with git operations and workflow best practices.

**Use when:**
- Creating commit messages
- Writing pull request descriptions
- Following git best practices
- Cleaning up git history

**Example usage:**
```
/Task with subagent_type='git-workflow' to generate a commit message for the current changes
```

**Capabilities:**
- Conventional commit message generation
- Pull request template creation
- Branch naming conventions
- Commit history analysis
- Changelog generation
- Git best practices guidance

## Quick Reference

### By Use Case

**Creating Content:**
- New blog post → `blog-writer`
- Translation → `translator`

**Code Review:**
- Component review → `react-reviewer`
- Performance review → `performance-optimizer`

**Optimization:**
- Code refactoring → `refactoring-assistant`
- Bundle optimization → `build-optimizer`
- Performance issues → `performance-optimizer`

**Maintenance:**
- Dependencies → `dependency-manager`
- Git operations → `git-workflow`

### Invocation Pattern

All custom agents are invoked using the Task tool with the `subagent_type` parameter:

```
/Task with subagent_type='agent-name' to [describe your task]
```

## Agent Configuration

All agent configurations are stored in `.claude/agents/` as markdown files:

```
.claude/
├── agents/
│   ├── blog-writer.md
│   ├── build-optimizer.md
│   ├── dependency-manager.md
│   ├── git-workflow.md
│   ├── performance-optimizer.md
│   ├── react-reviewer.md
│   ├── refactoring-assistant.md
│   └── translator.md
└── settings.local.json
```

Each agent is configured with:
- **Name**: Agent identifier
- **Description**: Brief purpose statement
- **Tools**: Available tools (Read, Write, Edit, Bash, Grep, Glob)
- **Model**: Claude model to use (Sonnet, Haiku, Opus)
- **Prompt**: Detailed instructions and expertise

## Permissions

Current Claude Code permissions are configured in `.claude/settings.local.json`:

- npm commands (install, uninstall, run build, run dev)
- Tailwind CSS commands
- Blog generation scripts (blog:index, blog:rss)
- Basic shell utilities (tree, cat, find)

## Best Practices

1. **Use the right agent for the job**: Each agent is specialized for specific tasks
2. **Provide context**: Give agents relevant information about your task
3. **Review outputs**: Always review agent recommendations before applying
4. **Iterate**: Work with agents iteratively for complex tasks
5. **Combine agents**: Use multiple agents for comprehensive workflows

## Project Context

This configuration is optimized for:
- **Stack**: React 19 + TypeScript 5.9 + Vite 7.2
- **Styling**: Tailwind CSS 4.1
- **Content**: MDX-based bilingual blog (English/Polish)
- **i18n**: i18next for internationalization
- **Routing**: React Router v7

## Contributing

When modifying agent configurations:

1. Edit the relevant `.md` file in `.claude/agents/`
2. Follow the existing frontmatter format
3. Test the agent after changes
4. Document any significant changes in this README

## Support

For issues or questions about Claude Code or these custom agents:
- Claude Code Documentation: https://github.com/anthropics/claude-code
- Report Issues: https://github.com/anthropics/claude-code/issues

---
