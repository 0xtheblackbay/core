# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.2] - 2024-06-27

### Added

- Added Path for the encrypted file to secure-env. It is indicated in the config file or taken a default value.

### Fixed

- 

### Changed

- Configuration loading has been updated to allow unsetted variables processing and default values.

### Removed

- 

## [1.0.1] - 2023-07-15

### Added

- 1 additional operation for Deterministic Wallets management (checkWalletBalances).
- Added a field in ENV file for ETHERSCAN_API_KEY.
- Added a field in CONFIG file for HTTP JSON RPC Provider.

### Fixed

- 

### Changed

- Updated postman collection.
- changed deterministic library with an additional resource.

### Removed

- 

## [1.0.0] - 2023-07-14

### Added

- 4 operations for Deterministic Wallets management (createWallet, randomMnemonic, restoreWallet, validateMnemonic).

### Fixed

- 

### Changed

- 

### Removed

- *core* basic functions (about, changelog, readme) and redundant libraries