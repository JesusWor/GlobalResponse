# Framework: Ruby on Rails
# Archivo: global_response.rb

module Responses
  class GlobalResponse
    attr_reader :success, :message, :data, :errors, :pagination

    def initialize(success:, message:, data: nil, errors: nil, pagination: nil)
      @success = success
      @message = message
      @data = data
      @errors = errors
      @pagination = pagination
    end

    # Success responses
    def self.ok(message = 'Operación exitosa')
      new(success: true, message: message)
    end

    def self.ok_with_data(data, message = 'Operación exitosa')
      new(success: true, message: message, data: data)
    end

    def self.ok_paginated(data, total_items:, current_page:, page_size:, message: 'Datos obtenidos exitosamente')
      pagination = PaginationInfo.new(
        total_items: total_items,
        current_page: current_page,
        page_size: page_size
      )
      new(success: true, message: message, data: data, pagination: pagination)
    end

    # Error responses
    def self.fail(message)
      new(success: false, message: message)
    end

    def self.fail_with_errors(message, errors)
      new(success: false, message: message, errors: errors)
    end

    def self.validation_error(message, validation_errors)
      new(success: false, message: message, errors: validation_errors)
    end

    def self.not_found(message = 'Recurso no encontrado')
      new(success: false, message: message)
    end

    def self.unauthorized(message = 'No autorizado')
      new(success: false, message: message)
    end

    def self.server_error(message = 'Error interno del servidor')
      new(success: false, message: message)
    end

    def to_json(*_args)
      {
        success: @success,
        message: @message,
        data: @data,
        errors: @errors,
        pagination: @pagination&.to_hash
      }.compact.to_json
    end

    def as_json(options = {})
      {
        success: @success,
        message: @message,
        data: @data,
        errors: @errors,
        pagination: @pagination&.as_json
      }.compact
    end
  end

  class PaginationInfo
    attr_reader :total_items, :current_page, :page_size, :total_pages, :has_previous, :has_next

    def initialize(total_items:, current_page:, page_size:)
      @total_items = total_items
      @current_page = current_page
      @page_size = page_size
      @total_pages = (total_items.to_f / page_size).ceil
      @has_previous = current_page > 1
      @has_next = current_page < @total_pages
    end

    def to_hash
      {
        total_items: @total_items,
        current_page: @current_page,
        page_size: @page_size,
        total_pages: @total_pages,
        has_previous: @has_previous,
        has_next: @has_next
      }
    end

    def as_json(options = {})
      to_hash
    end
  end
end