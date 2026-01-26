#!/bin/bash

echo "=== FIXING ALL ROUTER VARIABLE NAMES ==="
echo ""

for router in routers/*_router.js; do
  name=$(basename "$router" "_router.js")
  controller_name="${name}_controller.js"
  
  echo "Fixing: $name"
  
  # Create a fresh, correct router
  cat > "$router" << ROUTER
const express = require("express");
const router = express.Router();
const ${name}Controller = require("../controllers/${controller_name}");
const { authenticateToken } = require("../middlewares/auth");
ROUTER
  
  # Add routes based on controller functions
  controller_file="controllers/${controller_name}"
  if [ -f "$controller_file" ]; then
    # Get all controller functions
    functions=$(grep -o "exports\.\w*\s*=" "$controller_file" | sed 's/exports\.//' | sed 's/\s*=//')
    
    # Add standard CRUD routes if functions exist
    for func in $functions; do
      if [[ $func == "getAll" || $func == "getAllCommunities" || $func == "getAllSubjects" || $func =~ ^getAll ]]; then
        echo "router.get(\"/\", authenticateToken, ${name}Controller.$func);" >> "$router"
      elif [[ $func == "getById" || $func == "getCommunityById" || $func == "getSubjectById" || $func =~ Id$ || $func =~ ById$ ]]; then
        echo "router.get(\"/:id\", authenticateToken, ${name}Controller.$func);" >> "$router"
      elif [[ $func == "create" || $func == "createCommunity" || $func == "createSubject" || $func =~ ^create ]]; then
        echo "router.post(\"/\", authenticateToken, ${name}Controller.$func);" >> "$router"
      elif [[ $func == "update" || $func == "updateCommunity" || $func == "updateSubject" || $func =~ ^update ]]; then
        echo "router.put(\"/:id\", authenticateToken, ${name}Controller.$func);" >> "$router"
      elif [[ $func == "delete" || $func == "deleteCommunity" || $func == "deleteSubject" || $func =~ ^delete ]]; then
        echo "router.delete(\"/:id\", authenticateToken, ${name}Controller.$func);" >> "$router"
      fi
    done
    
    # For community specifically, add custom routes
    if [ "$name" == "community" ]; then
      cat >> "$router" << COMMUNITY_ROUTES

// Community-specific routes
router.get("/user", authenticateToken, ${name}Controller.getUserCommunities);
router.post("/:id/join", authenticateToken, ${name}Controller.joinCommunity);
router.post("/:id/leave", authenticateToken, ${name}Controller.leaveCommunity);
router.post("/:id/admin", authenticateToken, ${name}Controller.addAdmin);
router.delete("/:id/admin", authenticateToken, ${name}Controller.removeAdmin);
router.post("/:id/post", authenticateToken, ${name}Controller.createPost);
router.post("/:id/post/:postIndex/like", authenticateToken, ${name}Controller.likePost);
router.post("/:id/post/:postIndex/unlike", authenticateToken, ${name}Controller.unlikePost);
router.post("/:id/post/:postIndex/comment", authenticateToken, ${name}Controller.addComment);
router.post("/:id/post/:postIndex/comment/:commentIndex/reply", authenticateToken, ${name}Controller.addReplyToComment);
COMMUNITY_ROUTES
    fi
    
    # For wallet specifically
    if [ "$name" == "wallet" ]; then
      cat >> "$router" << WALLET_ROUTES

// Wallet-specific routes
router.get("/student/:studentId", authenticateToken, ${name}Controller.getWalletByStudentId);
router.get("/teacher/:teacherId", authenticateToken, ${name}Controller.getTeacherWallet);
router.get("/teacher/:teacherId/earnings", authenticateToken, ${name}Controller.getTeacherEarnings);
router.get("/transactions", authenticateToken, ${name}Controller.getTransactionHistory);
router.post("/deposit", authenticateToken, ${name}Controller.depositFunds);
router.post("/withdraw", authenticateToken, ${name}Controller.withdrawFunds);
router.post("/purchase", authenticateToken, ${name}Controller.purchaseContent);
router.post("/payout", authenticateToken, ${name}Controller.requestPayout);
router.post("/deposit/status", authenticateToken, ${name}Controller.checkDepositStatus);
router.put("/transaction/:id/status", authenticateToken, ${name}Controller.updateTransactionStatus);
WALLET_ROUTES
    fi
    
    # For payment specifically
    if [ "$name" == "payment" ]; then
      cat >> "$router" << PAYMENT_ROUTES

// Payment-specific routes
router.get("/stats", authenticateToken, ${name}Controller.getPaymentStats);
router.get("/student/:studentId", authenticateToken, ${name}Controller.getStudentPayments);
router.get("/teacher/:teacherId", authenticateToken, ${name}Controller.getTeacherPayments);
router.post("/initialize", authenticateToken, ${name}Controller.initializePayment);
router.post("/verify", authenticateToken, ${name}Controller.verifyPayment);
router.post("/webhook", ${name}Controller.paymentWebhook);
router.post("/refund", authenticateToken, ${name}Controller.processRefund);
router.put("/:id/status", authenticateToken, ${name}Controller.updatePaymentStatus);
router.get("/report", authenticateToken, ${name}Controller.generatePaymentReport);
PAYMENT_ROUTES
    fi
  fi
  
  # Close the router file
  echo "" >> "$router"
  echo "module.exports = router;" >> "$router"
  
  echo "  ✅ Fixed $name router"
done

echo ""
echo "=== ALL ROUTERS FIXED ==="
