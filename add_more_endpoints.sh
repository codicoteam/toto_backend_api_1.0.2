#!/bin/bash

echo "Adding POST, PUT, DELETE endpoints to routers..."

add_crud_endpoints() {
    local router_file=$1
    local tag_name=$2
    local base_path=$3
    
    echo "Enhancing $router_file..."
    
    # Check if file exists
    if [ ! -f "$router_file" ]; then
        echo "  ❌ File not found"
        return
    fi
    
    # Add POST endpoint
    if ! grep -q "router.post" "$router_file"; then
        cat >> "$router_file" << POST_ENDPOINT

/**
 * @swagger
 * $base_path:
 *   post:
 *     summary: Create new $tag_name
 *     tags: [$tag_name]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: $tag_name created successfully
 *       400:
 *         description: Invalid input
 */
router.post("/", authenticateToken, $(basename "$router_file" .js | sed 's/_router//' | sed 's/_routes//')Controller.create);
POST_ENDPOINT
        echo "  ✅ Added POST endpoint"
    fi
    
    # Add PUT endpoint
    if ! grep -q "router.put" "$router_file"; then
        cat >> "$router_file" << PUT_ENDPOINT

/**
 * @swagger
 * $base_path/{id}:
 *   put:
 *     summary: Update $tag_name
 *     tags: [$tag_name]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: $tag_name ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: $tag_name updated successfully
 *       404:
 *         description: $tag_name not found
 */
router.put("/:id", authenticateToken, $(basename "$router_file" .js | sed 's/_router//' | sed 's/_routes//')Controller.update);
PUT_ENDPOINT
        echo "  ✅ Added PUT endpoint"
    fi
    
    # Add DELETE endpoint
    if ! grep -q "router.delete" "$router_file"; then
        cat >> "$router_file" << DELETE_ENDPOINT

/**
 * @swagger
 * $base_path/{id}:
 *   delete:
 *     summary: Delete $tag_name
 *     tags: [$tag_name]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: $tag_name ID
 *     responses:
 *       200:
 *         description: $tag_name deleted successfully
 *       404:
 *         description: $tag_name not found
 */
router.delete("/:id", authenticateToken, $(basename "$router_file" .js | sed 's/_router//' | sed 's/_routes//')Controller.delete);
DELETE_ENDPOINT
        echo "  ✅ Added DELETE endpoint"
    fi
}

# Add to key routers
add_crud_endpoints "routers/topic_content_router.js" "Topic Content" "/api/v1/topic_content"
add_crud_endpoints "routers/library_book_router.js" "Library" "/api/v1/library_book"
add_crud_endpoints "routers/topic_in_subject.js" "Topic" "/api/v1/topic_in_subject"
add_crud_endpoints "routers/admin_student_chat_router.js" "Chat" "/api/v1/admin_student_chat"
add_crud_endpoints "routers/content_system_router.js" "Content" "/api/v1/content_system"
add_crud_endpoints "routers/comment_content_router.js" "Comment" "/api/v1/comment_content_system"
add_crud_endpoints "routers/comment_topic_content_router.js" "Comment Topic" "/api/v1/comment_topic_content"
add_crud_endpoints "routers/end_lesson_question_router.js" "Lesson Questions" "/api/v1/end_lesson_questions"
add_crud_endpoints "routers/message_community_router.js" "Message" "/api/v1/message_community_route"
add_crud_endpoints "routers/record_exam_router.js" "Record Exam" "/api/v1/record_exam"
add_crud_endpoints "routers/student_topic_progress_router.js" "Progress" "/api/v1/progress"
add_crud_endpoints "routers/homeBanner_routes.js" "Banner" "/api/v1/home_banners"

echo "✅ Added CRUD endpoints to all routers"
