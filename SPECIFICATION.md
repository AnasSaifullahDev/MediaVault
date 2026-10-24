# MediaVault — Project Specification

## 1. Project Overview

MediaVault is a web application designed to help users track the shows they watch and the books and other literature they read

## 2. Core Features

1. **Progress Tracking:** Users can track their progress through media and Literature using suitable units, such as episodes watched or chapters read.
2. **Rating System:** Users can rate entries using four categories: Masterpiece, Recommended, TimePass, and Not Worth the Hype.
3. **Status Management:** Users can mark entries as Planned(Media: Planned to Watch/ Literature: Planned to Read), In Progress (Media: Currently Watching/ Literature: Currently Reading), Completed, On Hold or Dropped.
## 3. Supported Content

MediaVault supports different types of shows and literature.

- **Media:** Movies, TV shows, anime, episodes, seasons, ONA, OVA, and other show-related content.
- **Literature:** Books, novels, poetry, manga, manhwa, manhua, and other forms of literature.

The application should allow users to organize their entries by category and type.

## 4. Dashboard and Library

### Dashboard
The dashboard displays summary statistics, the 3–5 latest entries, and a Create button in the top-right corner.

### All Entries Library
The All section displays all Media and Literature entries, sorted by the newest entries first. Users can filter entries individually by category, type, and status, including viewing entries with a specific status.

## 5. Create Entry

Users can click the Create button to open a modal over the current page.

- **Submit:** Saves the entry and creates its card in the library. The modal closes after the entry is saved successfully.
- **Back:** Closes the modal and discards any information the user entered without submitting.

The modal must not close accidentally when the user clicks outside it or presses Escape.

## 6. Required and Optional Fields

### Required Fields

- **Title:** The name of the media or literature entry.
- **Category:** The entry category, either Media or Literature.
- **Type:** The specific kind of content, depending on the selected category.
- **Status:** The current state of the entry, such as Planned(Media: Planned to Watch/ Literature: Planned to Read), In Progress (Media: Currently Watching/ Literature: Currently Reading), Completed, On Hold or Dropped.

### Optional Fields

- **Cover Image:** Users can upload an image, provide an image URL, or leave it empty.
- **Description:** Additional information about the entry.
- **Genre:** The genre of the media or literature.
- **Rating:** Users can leave an entry unrated until they have watched or read enough to evaluate it.

## 7. Progress Tracking

### Progress Fields

- **Current Progress:** Stores the number of episodes watched, chapters read, or other units completed so far.
- **Total Progress:** Stores the total number of episodes, chapters, or other units available. If the total is unknown, this field can be left blank.

### Progress Units

The progress unit depends on the content type.

- **Media:** Episodic shows use episodes watched. Other media types should use a suitable unit for tracking their progress.
- **Literature:** Manga, manhwa, manhua, and other chapter-based content use chapters read. Other literature types should use a suitable unit for tracking their progress.

### Displaying Progress

- When the total progress is known, the application should display the current progress and total, along with the completion percentage.
- When the total is unknown, the application should display the current progress and its unit without showing a completion percentage.

For example, if a user has read 35 chapters and the total is unknown, display "35 chapters read" without a percentage.

### Completion Rules

- Current progress cannot exceed the known total, and the user can correct an incorrect total.
- When the current progress reaches a known total, the application should automatically change the entry's status to Completed.
- Increasing progress while an entry is On Hold does not automatically change its status. The user must manually choose a different status to resume it but if it reach to mark total so it change its status and become Completed.
- If progress decreases after an entry has been automatically or manually marked Completed, its status does not remains Completed. the user have to choose either "in progress, on hold, dropped" and if the user decline to choose it became completed and can't be decreased and if the user choose any of the three it became any of the three.
- An entry cannot be manually marked Completed if its total progress is unknown or blank. The user must enter a valid total before marking it Completed.
- If the user manually selects Completed before reaching the known total, the application must ask for confirmation and explain that confirming will set current progress equal to total progress.
- If the user confirms, the application must set current progress equal to the known total and mark the entry as Completed. If the user declines, the status and progress must remain unchanged.
- If the total progress is increased so that current progress is less than the new total, an entry marked Completed must ask user to shoose "In Progress, On Hold, Dropped" and if the user decline to choose it became completed and can't be increased and if the user choose any of the three it became any of the three.