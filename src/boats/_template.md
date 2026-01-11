---
# =============================================================================
# BOAT LISTING TEMPLATE
# =============================================================================
# To add a new boat listing:
# 1. Copy this file and rename it (e.g., "catalina-25-2020.md")
# 2. Fill in the fields below (remove the # comments)
# 3. Add your boat description in Markdown below the --- line
# 4. Copy boat images to src/assets/images/boats/
# 5. Run "npm start" to preview or "npm run build" to publish
# =============================================================================

layout: layouts/boat.njk

# REQUIRED FIELDS
# ----------------
title: "Make Model, Year"           # e.g., "Catalina 25, 2020"
description: "Brief SEO description of the boat for search results"
date: 2026-01-11                    # Today's date (YYYY-MM-DD format)

# BOAT DETAILS
# ----------------
year: 2020                          # Year built
make: "Catalina"                    # Manufacturer (Catalina, Hunter, MacGregor, etc.)
model: "25"                         # Model name/number
price: 25000                        # Price in USD (number only, no $ or commas)
                                    # Remove this line if "Contact for price"

# STATUS: Choose one
# - active: Currently for sale
# - sold: Boat has been sold (listing stays in archive)
# - pending: Sale pending
status: active

# LOCATION
# ----------------
location: "Lake Travis, Austin, Texas"

# IMAGES
# ----------------
# Add boat photos to: src/assets/images/boats/
# List image paths below (first image is the main photo)
images:
  - /assets/images/boats/your-image-1.jpg
  - /assets/images/boats/your-image-2.jpg
  - /assets/images/boats/your-image-3.jpg

# FEATURES (optional)
# ----------------
# List key features and equipment
features:
  - Roller furling jib
  - Bimini top
  - Outboard motor included
  - Trailer included

# CONTACT INFO
# ----------------
# At least one contact method recommended
contactEmail: "seller@example.com"
contactPhone: "512-555-1234"

# TAGS (optional)
# ----------------
# Help with filtering/search. Common tags:
# - Brand: catalina, hunter, macgregor, oday, compac, hobie, precision
# - Type: trailerable, cruiser, daysailer, racer, catamaran, dinghy
# - Other: sold, reduced, project
tags:
  - catalina
  - trailerable
---

<!--
  BOAT DESCRIPTION
  ================
  Write your boat description below using Markdown formatting.

  Tips:
  - Be detailed and honest about condition
  - Mention recent upgrades or maintenance
  - Include sailing history (fresh water, coastal, etc.)
  - Explain why you're selling
  - Use headers (##) to organize sections
-->

Write your boat description here. This section supports full Markdown formatting.

## Highlights

- Key selling point 1
- Key selling point 2
- Key selling point 3

## Recent Upgrades

Describe any recent work, upgrades, or maintenance performed on the boat.

## Equipment Included

List what comes with the boat - sails, electronics, safety equipment, etc.

## Why I'm Selling

A brief note about why you're selling often helps buyers feel more comfortable.

---

*Contact me to schedule a viewing or sea trial!*
