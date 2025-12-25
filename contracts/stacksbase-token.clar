;; StacksBase Community Token (SIP-010 Fungible Token)
;; Built for Stacks Builder Challenges Week 3
;; 
;; This contract implements a simple token faucet where users can claim
;; tokens once per cooldown period.

;; Define the fungible token
(define-fungible-token stacksbase-token)

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-token-owner (err u101))
(define-constant err-cooldown-not-passed (err u102))
(define-constant err-invalid-amount (err u103))

;; Token decimals
(define-constant token-decimals u6)

;; Claim settings
(define-constant claim-amount u1000000000) ;; 1000 tokens with 6 decimals
(define-constant cooldown-blocks u144) ;; ~24 hours (10 min blocks)

;; Data variables
(define-data-var token-name (string-ascii 32) "StacksBase Token")
(define-data-var token-symbol (string-ascii 10) "SBASE")
(define-data-var token-uri (optional (string-utf8 256)) none)

;; Data maps
(define-map last-claim-block principal uint)
(define-map total-claims principal uint)

;; SIP-010 Standard Functions

(define-read-only (get-name)
  (ok (var-get token-name))
)

(define-read-only (get-symbol)
  (ok (var-get token-symbol))
)

(define-read-only (get-decimals)
  (ok token-decimals)
)

(define-read-only (get-balance (account principal))
  (ok (ft-get-balance stacksbase-token account))
)

(define-read-only (get-total-supply)
  (ok (ft-get-supply stacksbase-token))
)

(define-read-only (get-token-uri)
  (ok (var-get token-uri))
)

;; Transfer function
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-token-owner)
    (try! (ft-transfer? stacksbase-token amount sender recipient))
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)

;; Custom Functions

;; Check if user can claim
(define-read-only (can-claim (user principal))
  (let
    (
      (last-claim (default-to u0 (map-get? last-claim-block user)))
      (blocks-passed (- block-height last-claim))
    )
    (ok (>= blocks-passed cooldown-blocks))
  )
)

;; Get total claims for a user
(define-read-only (get-user-claims (user principal))
  (ok (default-to u0 (map-get? total-claims user)))
)

;; Get last claim block for a user
(define-read-only (get-last-claim-block (user principal))
  (ok (default-to u0 (map-get? last-claim-block user)))
)

;; Claim tokens (main faucet function)
(define-public (claim-tokens)
  (let
    (
      (caller tx-sender)
      (last-claim (default-to u0 (map-get? last-claim-block caller)))
      (blocks-passed (- block-height last-claim))
      (current-claims (default-to u0 (map-get? total-claims caller)))
    )
    ;; Check cooldown
    (asserts! (>= blocks-passed cooldown-blocks) err-cooldown-not-passed)
    
    ;; Mint tokens
    (try! (ft-mint? stacksbase-token claim-amount caller))
    
    ;; Update maps
    (map-set last-claim-block caller block-height)
    (map-set total-claims caller (+ current-claims u1))
    
    (ok claim-amount)
  )
)

;; Admin function to mint tokens (for initial distribution or emergencies)
(define-public (mint (amount uint) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (asserts! (> amount u0) err-invalid-amount)
    (ft-mint? stacksbase-token amount recipient)
  )
)

;; Admin function to set token URI
(define-public (set-token-uri (uri (string-utf8 256)))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (ok (var-set token-uri (some uri)))
  )
)

;; Initialize contract (optional, for setting initial parameters)
(define-public (initialize)
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    ;; Any initialization logic here
    (ok true)
  )
)
