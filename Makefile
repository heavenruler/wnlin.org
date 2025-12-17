.PHONY: help test commit update

help:
	@echo "Available targets:"
	@echo "  help     Show this help."
	@echo "  test     Start local http server (python3 -m http.server PORT, default 80)."
	@echo "  commit   Git add -A and commit with COMMIT_MSG (default: \"chore: update site\")."
	@echo "  update   Git pull to sync with remote."

PORT ?= 80
COMMIT_MSG ?= "chore: update site"

test:
	@echo "Starting local server on port $(PORT) (Ctrl+C to stop)..."
	@echo "http://localhost:$(PORT)"
	python3 -m http.server $(PORT)

commit:
	git add -A
	git commit -m $(COMMIT_MSG)

update:
	git pull
