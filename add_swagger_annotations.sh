#!/bin/bash

echo "Ì≥ù Adding Swagger annotations to routers..."

# Function to add Swagger to a router
add_swagger_to_router() {
    local router_file=$1
    
    # Skip if already has Swagger
    if grep -q "@swagger" "$router_file"; then
        echo "‚úÖ $router_file already has Swagger"
        return
    fi
    
    # Get router name
    router_name=$(basename "$router_file" .js)
    base_name=$(echo "$router_name" | sed 's/_router//; s/_routes//')
    
    # Convert to proper case for tag
    tag_name=$(echo "$base_name" | sed 's/_/ /g' | awk '{for(i=1;i<=NF;i++) $i=toupper(substr($i,1,1)) tolower(substr($i,2))}1' | sed 's/ //g')
    
    # Special cases
    case "$router_name" in
        "comment_content_router") tag_name="Comment" ;;
        "comment_topic_content_router") tag_name="CommentTopic" ;;
        "student_topic_progress_router") tag_name="Progress" ;;
        "end_lesson_question_router") tag_name="LessonQuestions" ;;
        "message_community_router") tag_name="Message" ;;
        "teacher_student_chat_router") tag_name="Chat" ;;
        "topic_in_subject_router") tag_name="TopicInSubject" ;;
        "home_banner_router") tag_name="Banner" ;;
        "library_book_router") tag_name="Library" ;;
    esac
    
    echo "Ì¥ß Adding Swagger to: $router_file (Tag: $tag_name)"
    
    # Create backup
    cp "$router_file" "${router_file}.backup"
    
    # Read the file and add Swagger annotations
    awk -v tag="$tag_name" '
    BEGIN { added_header=0; }
    
    # Add Swagger header after imports
    /const.*express.*require.*express/ && !added_header {
        print $0
        added_header=1
        next
    }
    
    # Insert Swagger documentation after imports
    added_header == 1 && /const.*Controller.*require/ {
        print $0
        print ""
        print "/**"
        print " * @swagger"
        print " * tags:"
        print " *   name: " tag
        print " *   description: " tag " management endpoints"
        print " */"
        print ""
        print "/**"
        print " * @swagger"
        print " * components:"
        print " *   securitySchemes:"
        print " *     bearerAuth:"
        print " *       type: http"
        print " *       scheme: bearer"
        print " *       bearerFormat: JWT"
        print " */"
        print ""
        next
    }
    
    # Add Swagger annotations to GET / routes
    /router\.get\(\"\/(\"|\))/ && !/swagger/ {
        print ""
        print "/**"
        print " * @swagger"
        print " * /api/v1/" tolower(tag) ":"
        print " *   get:"
        print " *     tags:"
        print " *       - " tag
        print " *     summary: Get all " tag " records"
        print " *     security:"
        print " *       - bearerAuth: []"
        print " *     responses:"
        print " *       200:"
        print " *         description: Success"
        print " *         content:"
        print " *           application/json:"
        print " *             schema:"
        print " *               type: object"
        print " *               properties:"
        print " *                 success:"
        print " *                   type: boolean"
        print " *                   example: true"
        print " *                 message:"
        print " *                   type: string"
        print " *                 data:"
        print " *                   type: array"
        print " *                   items:"
        print " *                     type: object"
        print " */"
        print $0
        next
    }
    
    # Add Swagger annotations to GET /:id routes
    /router\.get\(\"\/:id/ && !/swagger/ {
        print ""
        print "/**"
        print " * @swagger"
        print " * /api/v1/" tolower(tag) "/{id}:"
        print " *   get:"
        print " *     tags:"
        print " *       - " tag
        print " *     summary: Get " tag " by ID"
        print " *     parameters:"
        print " *       - in: path"
        print " *         name: id"
        print " *         required: true"
        print " *         schema:"
        print " *           type: string"
        print " *     security:"
        print " *       - bearerAuth: []"
        print " *     responses:"
        print " *       200:"
        print " *         description: Success"
        print " *       404:"
        print " *         description: Not found"
        print " */"
        print $0
        next
    }
    
    # Add Swagger annotations to POST / routes
    /router\.post\(\"\// && !/swagger/ {
        print ""
        print "/**"
        print " * @swagger"
        print " * /api/v1/" tolower(tag) ":"
        print " *   post:"
        print " *     tags:"
        print " *       - " tag
        print " *     summary: Create new " tag
        print " *     security:"
        print " *       - bearerAuth: []"
        print " *     requestBody:"
        print " *       required: true"
        print " *       content:"
        print " *         application/json:"
        print " *           schema:"
        print " *             type: object"
        print " *     responses:"
        print " *       201:"
        print " *         description: Created"
        print " *       400:"
        print " *         description: Bad request"
        print " */"
        print $0
        next
    }
    
    # Add Swagger annotations to PUT /:id routes
    /router\.put\(\"\/:id/ && !/swagger/ {
        print ""
        print "/**"
        print " * @swagger"
        print " * /api/v1/" tolower(tag) "/{id}:"
        print " *   put:"
        print " *     tags:"
        print " *       - " tag
        print " *     summary: Update " tag
        print " *     parameters:"
        print " *       - in: path"
        print " *         name: id"
        print " *         required: true"
        print " *         schema:"
        print " *           type: string"
        print " *     security:"
        print " *       - bearerAuth: []"
        print " *     requestBody:"
        print " *       required: true"
        print " *       content:"
        print " *         application/json:"
        print " *           schema:"
        print " *             type: object"
        print " *     responses:"
        print " *       200:"
        print " *         description: Success"
        print " *       404:"
        print " *         description: Not found"
        print " */"
        print $0
        next
    }
    
    # Add Swagger annotations to DELETE /:id routes
    /router\.delete\(\"\/:id/ && !/swagger/ {
        print ""
        print "/**"
        print " * @swagger"
        print " * /api/v1/" tolower(tag) "/{id}:"
        print " *   delete:"
        print " *     tags:"
        print " *       - " tag
        print " *     summary: Delete " tag
        print " *     parameters:"
        print " *       - in: path"
        print " *         name: id"
        print " *         required: true"
        print " *         schema:"
        print " *           type: string"
        print " *     security:"
        print " *       - bearerAuth: []"
        print " *     responses:"
        print " *       200:"
        print " *         description: Success"
        print " *       404:"
        print " *         description: Not found"
        print " */"
        print $0
        next
    }
    
    # Print all other lines
    { print $0 }
    ' "$router_file" > "${router_file}.tmp"
    
    mv "${router_file}.tmp" "$router_file"
    echo "  ‚úÖ Added Swagger to $router_file"
}

# Process all router files
for router_file in routers/*.js; do
    # Skip backup files
    if [[ "$router_file" != *".backup" ]] && [[ "$router_file" != *"temp_"* ]]; then
        add_swagger_to_router "$router_file"
    fi
done

echo ""
echo "Ìæâ Swagger annotations added to main routers!"
echo "Note: Skipped temp_* routers. You can enable them in server.js if needed."
