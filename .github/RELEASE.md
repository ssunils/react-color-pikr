# Release Process

This document outlines the release process for react-color-pikr.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)
- **Trigger**: Push to `main`/`develop` branches, PRs to `main`
- **Purpose**: Run tests, linting, type checking, and build verification
- **Matrix**: Tests on Node.js 18, 20, and 22

### 2. Release Workflow (`.github/workflows/release.yml`)
- **Trigger**: Manual workflow dispatch
- **Purpose**: Create a new version, tag, and GitHub release
- **Options**:
  - `patch`: Bug fixes (1.1.1 → 1.1.2)
  - `minor`: New features (1.1.1 → 1.2.0)
  - `major`: Breaking changes (1.1.1 → 2.0.0)
  - `prerelease`: Beta/alpha versions (1.1.1 → 1.1.2-beta.1)

### 3. Publish Workflow (`.github/workflows/publish.yml`)
- **Trigger**: GitHub release published
- **Purpose**: Publish to npm registry
- **Features**:
  - Checks if version already exists on npm
  - Skips publishing if version already published
  - Determines npm tag based on version (beta/latest)

## Release Steps

### Method 1: Using GitHub Actions (Recommended)

1. Go to **Actions** tab in GitHub
2. Select **Release** workflow
3. Click **Run workflow**
4. Choose version type and optional prerelease tag
5. The workflow will:
   - Bump version in package.json
   - Create git tag
   - Push changes
   - Create GitHub release
   - Trigger publish workflow automatically

### Method 2: Using npm scripts

```bash
# For patch release
npm run release:patch

# For minor release  
npm run release:minor

# For major release
npm run release:major

# For beta release
npm run release:beta
```

### Method 3: Manual release

```bash
# 1. Bump version
npm version patch  # or minor/major/prerelease

# 2. Push with tags
git push origin main --tags

# 3. Create GitHub release manually
# This will trigger the publish workflow
```

## Important Notes

- ✅ The publish workflow now checks if a version already exists before publishing
- ✅ No more duplicate publish attempts
- ✅ Clean separation between release creation and npm publishing
- ✅ Supports both stable and prerelease versions
- ✅ Uses modern GitHub CLI instead of deprecated actions

## Troubleshooting

### Version Already Published Error
If you see "403 Forbidden - You cannot publish over the previously published version", it means:
1. The version already exists on npm
2. The workflow will now skip publishing automatically
3. No action needed - this is expected behavior

### Failed Workflow
1. Check the workflow logs in GitHub Actions
2. Common issues:
   - npm token expired (update `NPM_TOKEN` secret)
   - Git permissions (check `GITHUB_TOKEN` permissions)
   - Version conflicts (use the version check feature)
