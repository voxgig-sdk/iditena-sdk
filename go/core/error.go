package core

import "encoding/json"

type IditenaError struct {
	IsIditenaError bool
	Sdk                string
	Code               string
	Msg                string
	// Reachable for a debugger, invisible to a serialiser: the context holds
	// the live spec and options, and an error is what gets logged.
	Ctx    *Context `json:"-"`
	Result any
	Spec   any
	// The HTTP status, -1 when there was no response.
	Status int
}

func NewIditenaError(code string, msg string, ctx *Context) *IditenaError {
	return &IditenaError{
		IsIditenaError: true,
		Sdk:                "Iditena",
		Code:               code,
		Msg:                msg,
		Ctx:                ctx,
		Status:             -1,
	}
}

func (e *IditenaError) NotFound() bool {
	return 404 == e.Status
}

func (e *IditenaError) Error() string {
	return e.Msg
}

// What makeError attached is already cleaned; the context is not part of
// the record.
func (e *IditenaError) Record() map[string]any {
	return map[string]any{
		"sdk":     e.Sdk,
		"code":    e.Code,
		"message": e.Msg,
		"status":  e.Status,
		"result":  e.Result,
		"spec":    e.Spec,
	}
}

func (e *IditenaError) MarshalJSON() ([]byte, error) {
	return json.Marshal(e.Record())
}
